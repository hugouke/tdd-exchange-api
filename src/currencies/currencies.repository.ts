import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { Currencies } from './currencies.entity';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@EntityRepository(Currencies)
export class CurrenciesRepository extends Repository<Currencies> {
  async getCurrency(currency: string): Promise<Currencies> {
    const result = await this.findOne({ currency });

    if (!result) {
      throw new NotFoundException(`The currency ${currency} not found.`);
    }

    return result;
  }

  async createCurrency(createCurrencyDto: CreateCurrencyDto): Promise<Currencies> {
    const createCurrency = new Currencies();
    createCurrency.currency = createCurrencyDto.currency;
    createCurrency.value = createCurrencyDto.value;

    try {
      await validateOrReject(createCurrency);
      await this.save(createCurrency);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return createCurrency;
  }

  async updateCurrency({ currency, value }: CreateCurrencyDto): Promise<Currencies> {
    const result = await this.findOne({ currency });

    if (!result) {
      throw new NotFoundException(`The currency ${currency} not found.`);
    }

    try {
      result.value = value;
      await this.save(result);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return result;
  }

  async deleteCurrency(currency: string): Promise<void> {
    const result = await this.findOne({ currency });

    if (!result) {
      throw new NotFoundException(`The currency ${currency} not found.`);
    }

    await this.delete({ currency });
  }
}
