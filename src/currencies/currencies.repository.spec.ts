import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesRepository } from './currencies.repository';
import { Currencies } from './currencies.entity';

describe('CurrenciesRepository', () => {
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrenciesRepository],
    }).compile();

    repository = module.get<CurrenciesRepository>(CurrenciesRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getCurrency()', () => {
    it('should be called findOne with correct params', async () => {
      repository.findOne = jest.fn().mockReturnValue({});
      await repository.getCurrency('USD');
      expect(repository.findOne).toBeCalledWith({ currency: 'USD' });
    });

    it('should be throw findOne returns empty', async () => {
      repository.findOne = jest.fn().mockReturnValue(undefined);
      await expect(repository.getCurrency('USD')).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });

    it('should be returns when findOne returns', async () => {
      const mockData = { currency: 'USD', value: 1 } as Currencies;
      repository.findOne = jest.fn().mockReturnValue(mockData);
      expect(await repository.getCurrency('USD')).toEqual(mockData);
    });
  });

  describe('createCurrency()', () => {
    it('should be called findOne with correct params', async () => {
      repository.findOne = jest.fn().mockReturnValue({});
      await repository.getCurrency('USD');
      expect(repository.findOne).toBeCalledWith({ currency: 'USD' });
    });
  });
});
