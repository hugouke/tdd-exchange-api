import { IsNotEmpty, IsNumberString, Length } from 'class-validator';

export class CreateCurrencyDto {
  @IsNotEmpty()
  @Length(3, 3)
  currency: string;

  @IsNotEmpty()
  @IsNumberString()
  value: number;
}
