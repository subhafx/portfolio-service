import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { TradeService } from './trade.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import {
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Trade')
@Controller({ version: '1' })
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateTradeDto })
  create(@Body(new ValidationPipe()) createTradeDto: CreateTradeDto) {
    return this.tradeService.create(createTradeDto);
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'No trade found with this stockID' })
  @ApiResponse({ status: 200, type: CreateTradeDto, isArray: true })
  findOne(@Param('id') stock_id: string) {
    return this.tradeService.findOne(stock_id);
  }

  @Patch(':id')
  @ApiNotFoundResponse({ description: 'Invalid trade ID' })
  @ApiOkResponse({ description: 'trade updated', type: UpdateTradeDto })
  update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) updateTradeDto: UpdateTradeDto,
  ) {
    return this.tradeService.update(id, updateTradeDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Trade record deleted' })
  remove(@Param('id') id: string) {
    return this.tradeService.remove(id);
  }
}
