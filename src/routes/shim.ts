import express from 'express';
import { config } from '../utils/config.js';
import { doesExist } from '../utils/utils.js';

const router = express.Router();

//@ts-ignore shut up
router.get('/shim', (req, res) => {
    const type = req.query.type as string;
    const board = req.query.board as string;

    if (!type || !board) return res.status(400).json({ error: 'Missing type or board' });

    const data = config['rma-shims'][type]?.[board];
    if (!data) return res.status(404).json({ error: 'Shim not found' });

    doesExist(res, data);
});

export default router;
