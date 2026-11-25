import Notification from '../models/Notification.js';

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { isRead: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user._id, isRead: false }, { isRead: true });
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Helper function to create notification (for controller triggers)
export const createNotificationHelper = async (userId, title, message) => {
  try {
    await Notification.create({
      user: userId,
      title,
      message
    });
  } catch (error) {
    console.error('Error creating notification helper:', error);
  }
};

// Bulk notification helper to avoid sequential DB writes in loops
export const createBulkNotificationsHelper = async (userIds, title, message) => {
  try {
    const uniqueIds = [...new Set(userIds.map((id) => String(id)))];
    if (uniqueIds.length === 0) return;

    const docs = uniqueIds.map((user) => ({
      user,
      title,
      message
    }));
    await Notification.insertMany(docs, { ordered: false });
  } catch (error) {
    console.error('Error creating bulk notifications:', error);
  }
};
