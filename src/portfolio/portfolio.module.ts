import { Module } from '@nestjs/common';

import { PortfolioController } from './portfolio.controller';
import { TradeModule } from '../trade/trade.module';
import { StockModule } from '../stock/stock.module';

@Module({
  imports: [TradeModule, StockModule],
  controllers: [PortfolioController],
})
export class PortfolioModule {}
