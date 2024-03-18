## Description

_Investment Portfolio Service_ - A Service to manage all your investments.

### API Documentation [here](https://documenter.getpostman.com/view/7909955/2sA2xnypyu) or Swagger Docs [here](http://localhost:3000/docs) [_This will only works when you start the app_]

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Service Architecture

### Tech stack
 - Node.js
   - Express.js 
   - Nest.js
 - MongoDB
   - Mongoose
   - Mongo Atlas
 - Swagger
   - Swagger-UI Express

### Investment Portfolio Service - API Design
It's consist of 3 modules. Stock, Trade & Portfolio. The API structure is as follows
- Portfolio
  - Overview (_Overview of user's portfolio including paginated trade history_)
  - Holdings (_Overview of all stock holdings_)
  - Returns (_Expected cumulative returns by stocks_)
  - Trade
      - Add Trade (_Add a trade_)
      - Update Trade (_Update previously added trade_)
      - Delete Trade (_Delete a trade_)
      - Get Trades by  stockId (_List all trade of a particular stock_)
  - Stock (_Used Yahoo Finance APIs for stock data_)
      - Trending stocks (_Top 5 trending stocks in US_)
      - Stock details by stockId (_Stock price details by stockID_)

### Database Schema
**Trade Schema**

```json
{
  "stock_id": "string", //Stock Id
  "type": "BUY", // Type can be either BUY or SELL
  "unit_price": 0, // Unit Price of the stock
  "quantity": 0, //How many stocks bought
  "total_amount": 0 //Final amount i.e. unit_price * quantity
}
```

