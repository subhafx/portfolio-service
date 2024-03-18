import { IConfig } from './types';
import * as process from 'process';

export const DevelopmentConfig: IConfig = {
  APP_PORT: 3000,
  MONGO_URI: process.env.MONGO_URI,
};
