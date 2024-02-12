import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Title' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ type: String, description: 'Description' })
  description: string;
}
