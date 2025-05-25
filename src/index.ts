import express from 'express';
import shimRoute from './routes/shim.js';
import recoRoute from './routes/reco.js';
import { logger } from './utils/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);

app.use(shimRoute);
app.use(recoRoute);

app.get('/', (_, res) => {
    res.send('CrOS DDL API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
