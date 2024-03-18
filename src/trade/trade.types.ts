import { TradeDocument } from './trade.schema';

export enum TradeType {
  BUY = 'BUY',
  SELL = 'SELL',
}

export type PaginationOptions = {
  page: number;
  limitPerPage: number;
};

export type Paginator = {
  page: number;
  limitPerPage: number;
  totalCount: number;
};

export type TradeHistory = {
  trades: TradeDocument[];
  paginator: Paginator;
};

export type StockAverageBuyingPrice = {
  stock_id: string;
  avg_buying_price: number;
  quantity: number;
};
