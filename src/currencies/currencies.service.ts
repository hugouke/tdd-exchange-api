import { BadRequestException, Injectable } from '@nestjs/common';
import { Currencies } from './currencies.entity';
import { CurrenciesRepository } from './currencies.repository';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@Injectable()
export class CurrenciesService {
  constructor(private currenciesRepository: CurrenciesRepository) {}

  async getCurrency(currency: string): Promise<Currencies> {
    return await this.currenciesRepository.getCurrency(currency);
  }

  async createCurrency({ currency, value }: CreateCurrencyDto): Promise<Currencies> {
    if (value <= 0) {
      throw new BadRequestException('The value must be greater zero.');
    }
    return await this.currenciesRepository.createCurrency({ currency, value });
  }

  async updateCurrency({ currency, value }: CreateCurrencyDto): Promise<Currencies> {
    if (value <= 0) {
      throw new BadRequestException('The value must be greater zero.');
    }
    return await this.currenciesRepository.updateCurrency({ currency, value });
  }

  async deleteCurrency(currency: string): Promise<void> {
    return await this.currenciesRepository.deleteCurrency(currency);
  }
}
