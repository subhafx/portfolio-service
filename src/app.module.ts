import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockModule } from './stock/stock.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { TradeModule } from './trade/trade.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [CommonModule, StockModule, TradeModule, PortfolioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
