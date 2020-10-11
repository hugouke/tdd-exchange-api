import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

export class CurrenciesRepository {
  async getCurrency(currency: string): Promise<any> {
    //
  }

  async createCurrency({ currency, value }): Promise<any> {
    //
  }

  async updateCurrency({ currency, value }): Promise<any> {
    //
  }

  async deleteCurrency(currency): Promise<any> {
    //
  }
}

@Injectable()
export class CurrenciesService {
  constructor(private currenciesRepository: CurrenciesRepository) {}

  async getCurrency(currency: string): Promise<any> {
    try {
      return await this.currenciesRepository.getCurrency(currency);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async createCurrency({ currency, value }): Promise<any> {
    if (value <= 0) {
      throw new BadRequestException(`The value must be greater zero.`);
    }

    try {
      return await this.currenciesRepository.createCurrency({ currency, value });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async updateCurrency({ currency, value }): Promise<any> {
    if (value <= 0) {
      throw new BadRequestException(`The value must be greater zero.`);
    }

    try {
      return await this.currenciesRepository.updateCurrency({ currency, value });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async deleteCurrency(currency: string): Promise<any> {
    try {
      return await this.currenciesRepository.deleteCurrency(currency);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
