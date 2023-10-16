import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProposedLocation {
  @IsNotEmpty()
  @ApiProperty()
  postalCode: string;

  @IsNotEmpty()
  @ApiProperty()
  streetName: string;
}

export class CreateEventDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  createdBy: string;

  @IsNotEmpty()
  @ApiProperty()
  vendorId: string;

  @IsNotEmpty()
  @ApiProperty()
  proposedDates: string[];

  @IsNotEmpty()
  @ApiProperty()
  proposedLocation: ProposedLocation;
}
