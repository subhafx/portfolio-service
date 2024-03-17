import { Injectable } from '@nestjs/common';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { CreateTradeDto } from './dto/create-trade.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TradeDocument } from './trade.schema';
import { map as _map } from 'lodash';
import { record } from 'zod';

@Injectable()
export class TradeService {
  constructor(
    @InjectModel('Trade') private readonly tradeModel: Model<TradeDocument>,
  ) {}
  create(createTradeDto: CreateTradeDto) {
    return this.tradeModel.create({
      stock_id: createTradeDto.stockId,
      type: createTradeDto.type,
      unit_price: createTradeDto.unit_price,
      quantity: createTradeDto.quantity,
      total_amount: createTradeDto.unit_price * createTradeDto.quantity,
    });
  }

  async findAll(pageOptions: { page: number; limitPerPage: number }): Promise<{
    trades: TradeDocument[];
    paginator: { page: number; limitPerPage: number; totalCount: number };
  }> {
    const skip = (pageOptions.page - 1) * pageOptions.limitPerPage;
    const total = await this.tradeModel.countDocuments();

    const trades = await this.tradeModel
      .find()
      .skip(skip)
      .limit(pageOptions.limitPerPage)
      .exec();
    return {
      trades,
      paginator: {
        page: pageOptions.page,
        limitPerPage: pageOptions.limitPerPage,
        totalCount: total,
      },
    };
  }

  async getStocksAvgBuyingPrice(): Promise<
    Array<{
      stock_id: string;
      avg_buying_price: number;
      quantity: number;
    }>
  > {
    const aggsData = await this.tradeModel.aggregate([
      {
        $group: {
          _id: '$stock_id',
          total_price_paid: { $sum: '$total_amount' },
          total_quantity: { $sum: '$quantity' },
        },
      },
    ]);

    return _map(
      aggsData,
      (record: {
        _id: string;
        total_price_paid: number;
        total_quantity: number;
      }) => ({
        stock_id: record._id,
        avg_buying_price: record.total_price_paid / record.total_quantity,
        quantity: record.total_quantity,
      }),
    );
  }

  findOne(stock_id: string) {
    return this.tradeModel
      .find({
        stock_id: stock_id,
      })
      .sort({ _id: 'desc' });
  }

  async update(id: string, updateTradeDto: UpdateTradeDto) {
    const trade = await this.tradeModel.findById(id);
    if (!trade) {
      return;
    }

    if (updateTradeDto.type) {
      trade.type = updateTradeDto.type;
    }
    if (updateTradeDto.unit_price) {
      trade.unit_price = updateTradeDto.unit_price;
    }
    if (updateTradeDto.quantity) {
      trade.quantity = updateTradeDto.quantity;
    }

    trade.total_amount = trade.unit_price * trade.quantity;

    return await trade.save();
  }

  remove(id: string) {
    return this.tradeModel.deleteOne({ _id: new Types.ObjectId(id) });
  }
}
