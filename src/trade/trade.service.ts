import { Injectable } from '@nestjs/common';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { CreateTradeDto } from './dto/create-trade.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TradeDocument } from './trade.schema';

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

  findAll() {
    return;
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
