import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currencies } from './currencies.entity';
import { CurrenciesRepository } from './currencies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Currencies, CurrenciesRepository])],
  providers: [CurrenciesService],
  controllers: [CurrenciesController],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
