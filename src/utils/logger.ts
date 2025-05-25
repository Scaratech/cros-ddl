import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { Request, Response, NextFunction } from 'express';

const logPath = join(process.cwd(), 'log.json');

export function logger(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
        const entry = {
            timestamp: Math.floor(Date.now() / 1000),
            ip: req.ip,
            path: req.path,
            query: req.query,
            method: req.method,
            status: res.statusCode
        };

        let logs = { logs: [] as any[] };

        if (existsSync(logPath)) {
            try {
                const raw = readFileSync(logPath, 'utf-8');
                logs = JSON.parse(raw);

                if (!Array.isArray(logs.logs)) logs.logs = [];
            } catch {
                logs.logs = [];
            }
        }

        logs.logs.push(entry);

        try {
            writeFileSync(logPath, JSON.stringify(logs, null, 2));
        } catch (e) {
            console.error('Failed to write log:', e);
        }
    });

    next();
}
