export enum ENV {
  DEVELOPMENT = 'development',
  SANDBOX = 'sandbox',
  PRODUCTION = 'production',
}
export interface IConfig {
  NODE_ENV?: ENV;
  APP_NAME?: string;
  APP_PORT: number;
  MONGO_URI: string;
}
