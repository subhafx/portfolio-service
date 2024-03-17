import { Module } from '@nestjs/common';
import { TradeService } from './trade.service';
import { TradeController } from './trade.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trade, TradeSchema } from './trade.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Trade.name,
        schema: TradeSchema,
      },
    ]),
  ],
  controllers: [TradeController],
  providers: [TradeService],
  exports: [TradeService],
})
export class TradeModule {}
