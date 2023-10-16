import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateEventDto {
  @IsNotEmpty()
  @ApiProperty()
  status: string;

  @IsOptional()
  @ApiProperty()
  confirmedDate: string;

  @IsOptional()
  @ApiProperty()
  remarks: string;
}
