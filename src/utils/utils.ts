import { resolve } from "path";
import { existsSync } from "fs";
import { Response } from 'express';

export function doesExist(res: Response, path: string) {
    const resolved = resolve(path);

    if (existsSync(resolved)) {
        res.sendFile(resolved);
    } else {
        res.status(404).json({ error: 'File not found' });
    }
}
