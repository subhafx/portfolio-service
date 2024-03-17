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
        // useFactory: () => {
        //   console.log('Here');
        //   const schema = TradeSchema;
        //   schema.pre('save', function (next) {
        //     if (this.isModified('unit_price') || this.isModified('quantity')) {
        //       this.total_amount = this.unit_price * this.quantity;
        //     }
        //     next();
        //   });
        //   return schema;
        // },
        schema: TradeSchema,
      },
    ]),
  ],
  controllers: [TradeController],
  providers: [TradeService],
})
export class TradeModule {}
