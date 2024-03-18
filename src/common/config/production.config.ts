import { IConfig } from './types';
import * as process from 'process';

export const ProductionConfig: IConfig = {
  APP_PORT: 5000,
  MONGO_URI: process.env.MONGO_URI,
};
