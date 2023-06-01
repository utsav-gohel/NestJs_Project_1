import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLatitude,
  IsLongitude,
} from 'class-validator';

export class CreateReportDto {
  @ApiProperty()
  @IsString()
  make: string;
  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsNumber()
  @Min(1390)
  @Max(2050)
  year: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @ApiProperty()
  @IsLongitude()
  lng: number;

  @ApiProperty()
  @IsLatitude()
  lat: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  price: number;
}
