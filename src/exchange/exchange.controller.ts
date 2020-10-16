import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ExchangeInputDto } from './dto/exchange-input.dto';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
export class ExchangeController {
  constructor(private exchangeService: ExchangeService) {}

  @Get()
  @UsePipes(ValidationPipe)
  async convertAmount(@Query() exchangeInputDto: ExchangeInputDto): Promise<any> {
    return await this.exchangeService.convertAmount(exchangeInputDto);
  }
}
