import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Currencies } from './currencies.entity';
import { CurrenciesService } from './currencies.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';

@Controller('currencies')
export class CurrenciesController {
  constructor(private currenciesService: CurrenciesService) {}

  @Get('/:currency')
  async getCurrency(@Param('currency') currency: string): Promise<Currencies> {
    return await this.currenciesService.getCurrency(currency);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createCurrency(@Body() createCurrencyDto: CreateCurrencyDto): Promise<Currencies> {
    return await this.currenciesService.createCurrency(createCurrencyDto);
  }

  @Delete('/:currency')
  async deleteCurrency(@Param('currency') currency: string): Promise<void> {
    return await this.currenciesService.deleteCurrency(currency);
  }
}
