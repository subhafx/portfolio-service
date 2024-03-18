import { TradeType } from '../trade.types';
import { IsString, IsInt, IsEnum, IsNumber } from 'class-validator';

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
