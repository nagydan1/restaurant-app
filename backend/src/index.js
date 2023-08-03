import mongoose from 'mongoose';
import logger from './logger';
import app from './app';
import config from './config';

const PORT = config.port || 8080;
const URI = config.db.uri || 'mongodb://localhost:27017/restaurant';

const connectToMongo = async () => {
  try {
    await mongoose.connect(URI);
    logger.info('Successfully connected to MongoDB');
  } catch (err) {
    logger.error(err.message);
  }
};

connectToMongo();

app.listen(PORT, () => {
  logger.info(`App is listening on ${PORT}`);
});
