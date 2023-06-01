import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { Column } from 'typeorm';

export class ReportDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  price: number;

  @ApiProperty()
  @Expose()
  year: number;

  @ApiProperty()
  @Expose()
  lng: number;

  @ApiProperty()
  @Expose()
  lat: number;

  @ApiProperty()
  @Expose()
  make: string;

  @ApiProperty()
  @Expose()
  model: string;

  @ApiProperty()
  @Expose()
  mileage: number;

  @ApiProperty()
  @Expose()
  approved: boolean;
  @Transform(({ obj }) => obj.user.id)
  @ApiProperty()
  @Expose()
  userId: number;
}
