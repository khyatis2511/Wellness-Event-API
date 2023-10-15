import { ApiProperty } from '@nestjs/swagger';
import { Location } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  createdBy: string;

  @IsNotEmpty()
  @ApiProperty()
  venderId: string;

  @IsNotEmpty()
  @ApiProperty()
  proposedDates: string[];

  @IsNotEmpty()
  @ApiProperty()
  proposedLocation: Location;
}
