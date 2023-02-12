import express from 'express';
import morgan from 'morgan';

import logger from './logger';

const app = express();

app.use(morgan('combined', { stream: logger.stream }));

export default app;
