import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import config from './config';
import { randomUUID } from 'crypto';

const imageStorage = multer.diskStorage({
  destination: async (_req, _file, cb) => {
    const destDir = path.join(config.publicPath, 'images');
    await fs.mkdir(destDir, { recursive: true });
    cb(null, destDir);
  },
  filename: (_req, file, cb) => {
    const extension = path.extname(file.originalname);
    const newFilename = randomUUID() + extension;
    cb(null, '' + newFilename);
  },
});

export const imagesUpload = multer({ storage: imageStorage });