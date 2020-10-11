import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesRepository } from './currencies.repository';
import { CurrenciesService } from './currencies.service';
import { Currencies } from './currencies.entity';

describe('CurrenciesService', () => {
  let service: CurrenciesService;
  let repository: CurrenciesRepository;
  let mockData;

  beforeEach(async () => {
    const currenciesRepositoryMock = {
      getCurrency: jest.fn(),
      createCurrency: jest.fn(),
      updateCurrency: jest.fn(),
      deleteCurrency: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrenciesService,
        {
          provide: CurrenciesRepository,
          useFactory: () => currenciesRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<CurrenciesService>(CurrenciesService);
    repository = module.get<CurrenciesRepository>(CurrenciesRepository);
    mockData = { currency: 'USD', value: 1 } as Currencies;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCurrency()', () => {
    it('should be throw if repository throw', async () => {
      (repository.getCurrency as jest.Mock).mockRejectedValue(new InternalServerErrorException());
      await expect(service.getCurrency('INVALID')).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.getCurrency('USD')).resolves.not.toThrow();
    });

    it('should be called repository with correct params', async () => {
      await service.getCurrency('USD');
      expect(repository.getCurrency).toBeCalledWith('USD');
    });

    it('should be return when repository return', async () => {
      (repository.getCurrency as jest.Mock).mockReturnValue(mockData);
      expect(await service.getCurrency('USD')).toEqual(mockData);
    });
  });

  describe('createCurrency()', () => {
    it('should be throw if repository throw', async () => {
      (repository.createCurrency as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      mockData.currency = 'INVALID';
      await expect(service.createCurrency(mockData)).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.createCurrency(mockData)).resolves.not.toThrow();
    });

    it('should be called repository with correct params', async () => {
      await service.createCurrency(mockData);
      expect(repository.createCurrency).toBeCalledWith(mockData);
    });

    it('should be throw if value <= 0', async () => {
      mockData.value = 0;
      await expect(service.createCurrency(mockData)).rejects.toThrow(
        new BadRequestException('The value must be greater zero.'),
      );
    });

    it('should be return when repository return', async () => {
      (repository.createCurrency as jest.Mock).mockReturnValue(mockData);
      expect(await service.createCurrency(mockData)).toEqual(mockData);
    });
  });

  describe('updateCurrency()', () => {
    it('should be throw if repository throw', async () => {
      (repository.updateCurrency as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      mockData.currency = 'INVALID';
      await expect(service.updateCurrency(mockData)).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.updateCurrency(mockData)).resolves.not.toThrow();
    });

    it('should be called repository with correct params', async () => {
      await service.updateCurrency(mockData);
      expect(repository.updateCurrency).toBeCalledWith(mockData);
    });

    it('should be throw if value <= 0', async () => {
      mockData.value = 0;
      await expect(service.updateCurrency(mockData)).rejects.toThrow(
        new BadRequestException('The value must be greater zero.'),
      );
    });

    it('should be return when repository return', async () => {
      (repository.updateCurrency as jest.Mock).mockReturnValue(mockData);
      expect(await service.updateCurrency(mockData)).toEqual(mockData);
    });
  });

  describe('deleteCurrency()', () => {
    it('should be throw if repository throw', async () => {
      (repository.deleteCurrency as jest.Mock).mockRejectedValue(
        new InternalServerErrorException(),
      );
      await expect(service.deleteCurrency('INVALID')).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });

    it('should be not throw if repository returns', async () => {
      await expect(service.deleteCurrency('USD')).resolves.not.toThrow();
    });

    it('should be called repository with correct params', async () => {
      await service.deleteCurrency('USD');
      expect(repository.deleteCurrency).toBeCalledWith('USD');
    });
  });
});
