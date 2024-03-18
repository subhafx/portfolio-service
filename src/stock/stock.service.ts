import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { default as yf } from 'yahoo-finance2';
import { map as _map, reduce as _reduce } from 'lodash';
import { Stock } from './entities/stock.entity';
import { StockList, StockMarketPrice } from './types';
@Injectable()
export class StockService {
  async findAll(count: number): Promise<StockList> {
    const { count: totalCount, quotes } = await yf.trendingSymbols('US', {
      count,
      lang: 'en-US',
    });

    return {
      count: totalCount,
      stocks: await this.getCurrentMarketPriceByStockIds(
        _map(quotes, 'symbol'),
      ),
    };
  }
  async findOne(ticker: string): Promise<Stock | BadRequestException> {
    try {
      const { price } = await yf.quoteSummary(ticker, { modules: ['price'] });
      const {
        regularMarketPrice,
        regularMarketPreviousClose,
        regularMarketOpen,
        symbol,
        longName,
      } = price;
      return new Stock(
        symbol,
        longName,
        regularMarketPreviousClose,
        regularMarketOpen,
        regularMarketPrice,
      );
    } catch (exception) {
      throw new NotFoundException('Internal Service Error', {
        cause: exception,
        description: exception.message,
      });
    }
  }

  async getCurrentMarketPriceByStockIds(
    stock_ids: string[],
  ): Promise<StockMarketPrice> {
    const map = await yf.quote([...stock_ids]);
    return _reduce(
      map,
      (acc, details) => {
        acc[details.symbol] = details.regularMarketPrice;
        return acc;
      },
      {},
    );
  }
}
