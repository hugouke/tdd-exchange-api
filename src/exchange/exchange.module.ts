import { Module } from '@nestjs/common';
import { CurrenciesModule } from 'src/currencies/currencies.module';
import { ExchangeService } from './exchange.service';

@Module({
  imports: [CurrenciesModule],
  providers: [ExchangeService],
})
export class ExchangeModule {}
