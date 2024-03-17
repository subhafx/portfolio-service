// import { z } from 'zod';
import { CreateTradeDto } from './create-trade.dto';
import { PartialType } from '@nestjs/swagger';

// export const updateTradeSchema = createTradeSchema.partial();

// export type UpdateTradeDto = z.infer<typeof updateTradeSchema>;
export class UpdateTradeDto extends PartialType(CreateTradeDto) {}
