export class Stock {
  public id: string;
  public name: string;
  public previousMarketClosePrice: number;
  public marketOpenPrice: number;
  public currentMarketPrice: number;
  constructor(
    id: string,
    name: string,
    previousMarketClosePrice: number,
    marketOpenPrice: number,
    currentMarketPrice: number,
  ) {
    this.id = id;
    this.name = name;
    this.previousMarketClosePrice = previousMarketClosePrice;
    this.marketOpenPrice = marketOpenPrice;
    this.currentMarketPrice = currentMarketPrice;
  }
}
