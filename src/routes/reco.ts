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

    if (type === 'official') {
        const official = config['recovery-images']['official'];

        if (!official) return res.status(404).json({ error: 'Official recovery images not found' });
        if (!version) return res.status(400).json({ error: 'Missing version for official image' });

        const path = official[board]?.[version];
        if (!path) return res.status(404).json({ error: 'Recovery image not found' });

        doesExist(res, path);
    } else {
        const preBuilts = config['recovery-images']['pre-builts'];
        if (!preBuilts) return res.status(404).json({ error: 'Pre-built recovery images not found' });

        const group = preBuilts[type];
        if (!group) return res.status(404).json({ error: 'Recovery type not found' });

        const path = group[board];
        if (!path) return res.status(404).json({ error: 'Recovery image not found' });

        doesExist(res, path);
    }
});


export default router;
