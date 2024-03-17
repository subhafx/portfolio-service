import { TradeType } from '../trade.enums';
import { IsString, IsInt, IsEnum, IsNumber } from 'class-validator';
// import { z } from 'zod';

// export class CreateTradeDto {
//   public stockId: string;
//   public type: TradeType;
//   public unit_price: number;
//   public quantity: number;
//   constructor(
//     stockId: string,
//     type: TradeType,
//     unit_price: number,
//     quantity: number,
//   ) {
//     this.stockId = stockId;
//     this.type = type;
//     this.unit_price = unit_price;
//     this.quantity = quantity;
//   }
// }

export class CreateTradeDto {
  @IsString()
  stockId: string;
  @IsEnum(TradeType)
  type: TradeType;
  @IsNumber({ maxDecimalPlaces: 4 })
  unit_price: number;
  @IsInt()
  quantity: number;
}

// export const createTradeSchema = z
//   .object({
//     stock_id: z.string(),
//     type: z.nativeEnum(TradeType),
//     unit_price: z.number(),
//     quantity: z.number(),
//   })
//   .required();
//
// export type CreateTradeDto = z.infer<typeof createTradeSchema>;
