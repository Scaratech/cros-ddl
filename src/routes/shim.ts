import express from 'express';
import { config } from '../utils/config.js';
import { doesExist } from '../utils/utils.js';

const router = express.Router();

//@ts-ignore shut up
router.get('/shim', (req, res) => {
  const type = req.query.type as string;
  const board = req.query.board as string;

  if (!type || !board) return res.status(400).json({ error: 'Missing type or board' });

  const shims = config['rma-shims'];
  if (!shims) return res.status(500).json({ error: 'Shim config missing' });

  if (type === 'raw') {
    const path = shims['raw']?.[board];
    if (!path) return res.status(404).json({ error: 'Shim not found' });

    doesExist(res, path);
  } else {
    const preBuilts = shims['pre-builts'];
    if (!preBuilts) return res.status(404).json({ error: 'Pre-builts shim config missing' });

    const group = preBuilts[type];
    if (!group) return res.status(404).json({ error: 'Shim type not found' });

    const path = group[board];
    if (!path) return res.status(404).json({ error: 'Shim not found' });

    doesExist(res, path);
  }
});


export default router;
