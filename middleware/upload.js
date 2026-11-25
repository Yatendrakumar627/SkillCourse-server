import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const UPLOAD_DIR = path.resolve(__dirname, '../uploads');

// Ensure uploads directory exists regardless of current working directory
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const safeField = (file.fieldname || 'file').replace(/[^a-zA-Z0-9_-]/g, '');
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname || '').toLowerCase();
    cb(null, `${safeField}-${uniqueSuffix}${ext}`);
  }
});

const createUploader = ({ allowedMimeTypes, allowedExtensions, maxSizeBytes, errorMessage }) =>
  multer({
    storage,
    limits: { fileSize: maxSizeBytes },
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname || '').toLowerCase();
      if (allowedMimeTypes.has(file.mimetype) && allowedExtensions.has(ext)) {
        cb(null, true);
      } else {
        const err = new Error(errorMessage);
        err.statusCode = 400;
        cb(err, false);
      }
    }
  });

const IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

const ASSIGNMENT_MIME_TYPES = new Set([
  ...IMAGE_MIME_TYPES,
  'application/pdf',
  'text/plain',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/zip',
  'application/x-zip-compressed',
]);

const ASSIGNMENT_EXTENSIONS = new Set([
  ...IMAGE_EXTENSIONS,
  '.pdf',
  '.txt',
  '.doc',
  '.docx',
  '.zip',
]);

// Payment receipt uploads: strict raster images only (no SVG XSS)
export const upload = createUploader({
  allowedMimeTypes: IMAGE_MIME_TYPES,
  allowedExtensions: IMAGE_EXTENSIONS,
  maxSizeBytes: 5 * 1024 * 1024,
  errorMessage: 'Only JPG, PNG, WebP, or GIF image files are allowed!',
});

// Assignment handouts & student submissions: raster images + PDF/DOC/TXT/ZIP
export const uploadAssignmentFile = createUploader({
  allowedMimeTypes: ASSIGNMENT_MIME_TYPES,
  allowedExtensions: ASSIGNMENT_EXTENSIONS,
  maxSizeBytes: 10 * 1024 * 1024,
  errorMessage: 'Allowed file types: JPG, PNG, WebP, GIF, PDF, DOC, DOCX, TXT, or ZIP.',
});
