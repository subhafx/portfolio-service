import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from '../validation';

@ApiTags('Trade')
@Controller({
  version: '1',
})
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post()
  // @UsePipes(new ZodValidationPipe(createTradeSchema))
  create(@Body(new ValidationPipe()) createTradeDto: CreateTradeDto) {
    return this.tradeService.create(createTradeDto);
  }

  @Get(':id')
  findOne(@Param('id') stock_id: string) {
    return this.tradeService.findOne(stock_id);
  }

  @Patch(':id')
  // @UsePipes(new ZodValidationPipe(updateTradeSchema))
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTradeDto: UpdateTradeDto,
  ) {
    return this.tradeService.update(id, updateTradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tradeService.remove(id);
  }
}
