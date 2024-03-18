import { IConfig } from './types';
import * as process from 'process';

export const SandboxConfig: IConfig = {
  APP_PORT: 3001,
  MONGO_URI: process.env.MONGO_URI,
};
