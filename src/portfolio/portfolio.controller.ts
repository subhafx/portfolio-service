import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { map as _map } from 'lodash';
import { TradeService } from '../trade/trade.service';
import { StockService } from '../stock/stock.service';

@ApiTags('Portfolio')
@Controller({ version: '1' })
export class PortfolioController {
  constructor(
    private readonly tradeService: TradeService,
    private readonly stockService: StockService,
  ) {}
  @Get()
  async findAll(
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
    @Query('limitPerPage', new ParseIntPipe({ optional: true }))
    limitPerPage: number,
  ) {
    const stocksBuyingData = await this.tradeService.getStocksAvgBuyingPrice();
    const stockIds = _map(stocksBuyingData, 'stock_id');
    const currentPriceList =
      await this.stockService.getCurrentMarketPriceByStockIds(stockIds);

    const portfolio = _map(
      stocksBuyingData,
      ({ stock_id, avg_buying_price }) => {
        let type: string;
        const diff = currentPriceList[stock_id] - avg_buying_price;

        if (diff > 0) {
          type = 'PROFIT';
        } else if (diff == 0) {
          type = 'NO CHANGE';
        } else {
          type = 'LOSS';
        }

        return {
          stock_id,
          type,
          avg_buying_price: parseFloat(avg_buying_price.toFixed(2)),
          market_price: currentPriceList[stock_id],
          change: parseFloat(
            ((Math.abs(diff) / avg_buying_price) * 100).toFixed(2),
          ),
        };
      },
    );

    const tradeSummary = await this.tradeService.findAll({
      page,
      limitPerPage,
    });

    return {
      portfolio,
      tradeSummary,
    };
  }
  @Get('/holdings')
  holdings() {
    return this.tradeService.getStocksAvgBuyingPrice();
  }

  @Get('/returns')
  async returns() {
    const buyingData = await this.tradeService.getStocksAvgBuyingPrice();
    return _map(buyingData, ({ avg_buying_price, quantity, stock_id }) => {
      return {
        stock_id,
        quantity,
        avg_buying_price: parseFloat(avg_buying_price.toFixed(2)),
        returns: parseFloat((100 / avg_buying_price - 1).toFixed(2)),
      };
    });
  }
}
