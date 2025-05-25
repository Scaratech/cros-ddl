import express from 'express';
import { config } from '../utils/config.js';
import { doesExist } from '../utils/utils.js';

const router = express.Router();

//@ts-ignore shut up
router.get('/reco', (req, res) => {
    const type = req.query.type as string;
    const board = req.query.board as string;
    const version = req.query.ver as string | undefined;

    if (!type || !board) return res.status(400).json({ error: 'Missing type or board' });

    const rType = config['recovery-images'][type];
    if (!rType) return res.status(404).json({ error: 'Recovery type not found' });

    let path: string | undefined;

    if (type === 'official') {
        if (!version) return res.status(400).json({ error: 'Missing version for official image' });

        path = rType[board]?.[version];
    } else {
        path = rType[board];
    }

    if (!path) return res.status(404).json({ error: 'Recovery image not found' });

    doesExist(res, path);
});

export default router;
