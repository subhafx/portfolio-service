import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StockService } from './stock.service';
import { Stock } from './entities/stock.entity';

@ApiTags('Stock')
@Controller({
  version: '1',
})
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get()
  findAll() {
    return this.stockService.findAll(5);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Stock })
  @ApiNotFoundResponse({
    type: NotFoundException,
    description: 'Invalid stock id',
  })
  findOne(@Param('id') id: string) {
    return this.stockService.findOne(id);
  }
}
