import { ApiProperty } from '@nestjs/swagger';

export type StockMarketPrice = {
  [key: string]: number;
};

export class StockList {
  @ApiProperty()
  public count: number;
  @ApiProperty()
  public stocks: StockMarketPrice;
}
