import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

describe('StockController', () => {
  let controller: StockController;

  const mockedExpectedValues = {
    findAll: {
      count: 5,
      stockIds: ['BTC-USD', 'ETH-USD', 'BTC-CAD', 'SHIB-USD', 'ADA-USD'],
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
      providers: [
        {
          provide: StockService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockedExpectedValues.findAll),
          },
        },
      ],
    }).compile();

    controller = module.get<StockController>(StockController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll()', async () => {
    const response = await controller.findAll();
    expect(response).toEqual(mockedExpectedValues.findAll);
    expect(response.count).toBeDefined();
    expect(response.count).toEqual(5);
    expect(response.stockIds).toBeDefined();
    expect(response.stockIds).toHaveLength(5);
    expect(response.stockIds).toHaveLength(response.count);
  });
});
