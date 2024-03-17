import { Injectable } from '@nestjs/common';
import { default as yf } from 'yahoo-finance2';
import { map as _map } from 'lodash';
import { Stock } from './entities/stock.entity';
@Injectable()
export class StockService {
  async findAll(count: number): Promise<{ count: number; stockIds: string[] }> {
    const { count: totalCount, quotes } = await yf.trendingSymbols('US', {
      count,
      lang: 'en-US',
    });

    return {
      count: totalCount,
      stockIds: _map(quotes, 'symbol'),
    };
  }
  async findOne(ticker: string): Promise<Stock> {
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
  }
}
