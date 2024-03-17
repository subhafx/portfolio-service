import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PortfolioModule } from './portfolio/portfolio.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommonModule, PortfolioModule],
  controllers: [AppController],
})
export class AppModule {}
