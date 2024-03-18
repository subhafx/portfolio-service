import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig],
      cache: true,
      isGlobal: true,
    }),
  ],
})
export class CustomConfigModule {}
