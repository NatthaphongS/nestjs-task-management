import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: "Can't be empty" })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: "Can't be empty" })
  description: string;
}
