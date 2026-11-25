import crypto from 'crypto';

const getApiBase = () =>
  (process.env.TELEGRAM_API_BASE?.trim() || 'https://api.telegram.org').replace(/\/+$/, '');

const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const formatIstTime = () =>
  new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

export const isTelegramConfigured = () =>
  Boolean(process.env.TELEGRAM_BOT_TOKEN?.trim() && process.env.TELEGRAM_CHANNEL_ID?.trim());

const callTelegramApi = async (method, payload, timeoutMs = 8000) => {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  if (!token) return { ok: false, description: 'Telegram not configured' };

  const res = await fetch(`${getApiBase()}/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(timeoutMs),
  });
  return res.json().catch(() => ({ ok: false, description: `HTTP ${res.status}` }));
};

/**
 * Send an HTML-formatted message to the configured Telegram channel.
 * Fails silently on network/config issues so core API routes are never blocked.
 */
export const sendTelegramMessage = async (htmlText, chatIdOverride = null) => {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = chatIdOverride || process.env.TELEGRAM_CHANNEL_ID?.trim();
  if (!token || !chatId) {
    return { sent: false, reason: 'Telegram not configured' };
  }

  try {
    const data = await callTelegramApi('sendMessage', {
      chat_id: chatId,
      text: htmlText,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }, 5000);

    if (!data.ok) {
      console.error('Telegram API error:', data.description);
      return { sent: false, reason: data.description || 'Telegram API error' };
    }
    return { sent: true, messageId: data.result?.message_id };
  } catch (error) {
    console.error('Telegram send failed:', error.message);
    return { sent: false, reason: error.message };
  }
};

export const notifyTelegramEvent = (title, fields = []) => {
  const lines = [
    `<b>${escapeHtml(title)}</b>`,
    ...fields
      .filter(([, val]) => val !== undefined && val !== null && String(val).trim() !== '')
      .map(([label, val]) => `• <b>${escapeHtml(label)}:</b> ${escapeHtml(val)}`),
    `<i>${escapeHtml(formatIstTime())} IST</i>`,
  ];
  void sendTelegramMessage(lines.join('\n'));
};

// --- 2GB Channel File Delivery via one-time deep links + copyMessage ---
const pendingDeliveries = new Map();
const DELIVERY_TTL_MS = 10 * 60 * 1000;
let cachedBotUsername = process.env.TELEGRAM_BOT_USERNAME?.trim() || '';
let botPollingActive = false;

const cleanupExpiredTokens = () => {
  const now = Date.now();
  for (const [k, v] of pendingDeliveries.entries()) {
    if (v.expiresAt <= now) pendingDeliveries.delete(k);
  }
};

export const getBotUsername = async () => {
  if (cachedBotUsername) return cachedBotUsername;
  const data = await callTelegramApi('getMe', {}, 5000);
  if (data.ok && data.result?.username) {
    cachedBotUsername = data.result.username;
  }
  return cachedBotUsername;
};

export const createDeliveryLink = async ({ userId, moduleTitle, messageId }) => {
  cleanupExpiredTokens();
  const username = await getBotUsername();
  if (!username) {
    throw new Error('Could not resolve Telegram bot username');
  }
  const token = crypto.randomBytes(16).toString('hex');
  pendingDeliveries.set(token, {
    userId: String(userId),
    moduleTitle,
    messageId: Number(messageId),
    expiresAt: Date.now() + DELIVERY_TTL_MS,
  });
  return {
    telegramLink: `https://t.me/${username}?start=dl_${token}`,
    expiresInMinutes: 10,
  };
};

/**
 * Long-polls Telegram updates so students clicking `https://t.me/<bot>?start=dl_<token>`
 * immediately receive up-to-2GB files copied from the private channel via copyMessage.
 */
export const startTelegramBotListener = () => {
  if (botPollingActive || !isTelegramConfigured()) return;
  botPollingActive = true;

  void getBotUsername().then((name) => {
    if (name) console.log(`Telegram 2GB file delivery bot active: @${name}`);
  });

  let offset = 0;
  const poll = async () => {
    while (botPollingActive && isTelegramConfigured()) {
      try {
        const data = await callTelegramApi('getUpdates', {
          offset,
          timeout: 25,
          allowed_updates: ['message'],
        }, 32000);

        if (data.ok && Array.isArray(data.result)) {
          for (const update of data.result) {
            offset = update.update_id + 1;
            const msg = update.message;
            const text = msg?.text?.trim() || '';
            const chatId = msg?.chat?.id;
            if (!chatId || !text.startsWith('/start')) continue;

            const match = text.match(/^\/start\s+dl_([a-f0-9]+)$/i);
            if (!match) {
              await sendTelegramMessage(
                'Welcome to <b>SkillCourse LMS</b>! Open any enrolled course on the website and click <b>Get File on Telegram</b> to receive your lecture/resources.',
                chatId
              );
              continue;
            }

            cleanupExpiredTokens();
            const token = match[1];
            const entry = pendingDeliveries.get(token);
            if (!entry) {
              await sendTelegramMessage(
                'This download link has expired or was already used. Please click <b>Get File on Telegram</b> again on your Student Dashboard.',
                chatId
              );
              continue;
            }

            pendingDeliveries.delete(token);
            const copyRes = await callTelegramApi('copyMessage', {
              chat_id: chatId,
              from_chat_id: process.env.TELEGRAM_CHANNEL_ID.trim(),
              message_id: entry.messageId,
            }, 10000);

            if (!copyRes.ok) {
              console.error('Telegram copyMessage failed:', copyRes.description);
              await sendTelegramMessage(
                `Could not deliver "${escapeHtml(entry.moduleTitle)}": ${escapeHtml(copyRes.description || 'Unknown error')}`,
                chatId
              );
            }
          }
        }
      } catch (err) {
        if (err.name !== 'TimeoutError') {
          await new Promise((r) => setTimeout(r, 3000));
        }
      }
    }
  };

  void poll();
};
