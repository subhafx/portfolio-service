import * as process from 'process';
import { DevelopmentConfig } from './development.config';
import { SandboxConfig } from './sandbox.config';
import { ProductionConfig } from './production.config';
import { InternalServerErrorException } from '@nestjs/common';
import { ENV, IConfig } from './types';

const defaultConfig: Partial<IConfig> = {
  APP_NAME: 'investment-portfolio-service',
  APP_PORT: 3000,
};

export const AppConfig = (): IConfig => {
  const nodeEnv = process.env.NODE_ENV;
  let envConfig: any;
  switch (nodeEnv) {
    case ENV.DEVELOPMENT:
      envConfig = DevelopmentConfig;
      break;
    case ENV.SANDBOX:
      envConfig = SandboxConfig;
      break;
    case ENV.PRODUCTION:
      envConfig = ProductionConfig;
      break;
    default:
      throw new InternalServerErrorException();
  }
  return {
    NODE_ENV: nodeEnv,
    ...defaultConfig,
    ...envConfig,
  };
};
