import mongoose from 'mongoose';
import config from '../config';
import logger from '../logger';
import menuItem from '../api/menuItems/menuItem-model';
import menuItems from './menuItems';

const { db } = config;

async function connectToDb() {
  try {
    await mongoose.connect(db.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    logger.info('MongoDB Connected');
  } catch (err) {
    logger.error(err.message);
  }
}
async function loadData() {
  await connectToDb();
  await menuItem.insertMany(menuItems);
  logger.info('Collections initialized');
  process.exit(0);
}

loadData();
