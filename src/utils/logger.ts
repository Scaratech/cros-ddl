import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { Request, Response, NextFunction } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const path = resolve(__dirname, '../usage.log');

const stream = createWriteStream(path, { flags: 'a' });

export function requestLogger(req: Request, _res: Response, next: NextFunction) {
    const timestamp = Math.floor(Date.now() / 1000);
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

    const query = Object.entries(req.query)
        .map(([k, v]) => `${k}=${v}`)
        .join('&');

    const line = `[${timestamp}] ${ip} ${req.path}${query ? '?' + query : ''}\n`;
    stream.write(line);

    next();
}
