import { Module } from '@nestjs/common';

import { PortfolioController } from './portfolio.controller';
import { TradeModule } from '../trade/trade.module';
import { StockModule } from '../stock/stock.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    TradeModule,
    StockModule,
    RouterModule.register([
      {
        path: 'portfolio',
        module: PortfolioModule,
        children: [
          { path: 'trade', module: TradeModule },
          { path: 'stock', module: StockModule },
        ],
      },
    ]),
  ],
  controllers: [PortfolioController],
})
export class PortfolioModule {}
