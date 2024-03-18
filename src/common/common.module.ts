import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CustomConfigModule } from './config/config.module';

@Module({
  imports: [CustomConfigModule, DatabaseModule],
})
export class CommonModule {}
