import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class getEstimateDto {
  @ApiProperty()
  @IsString()
  make: string;

  @ApiProperty()
  @IsString()
  model: string;
  @Transform(({ value }) => parseInt(value))
  @ApiProperty()
  @IsNumber()
  @Min(1390)
  @Max(2050)
  year: number;

  @Transform(({ value }) => parseInt(value))
  @ApiProperty()
  @IsNumber()
  @Min(0)
  @Max(1000000)
  mileage: number;

  @Transform(({ value }) => parseFloat(value))
  @ApiProperty()
  @IsLongitude()
  lng: number;

  @Transform(({ value }) => parseFloat(value))
  @ApiProperty()
  @IsLatitude()
  lat: number;
}
