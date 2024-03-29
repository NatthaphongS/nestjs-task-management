import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../task-status.enum';
import { IsEnum } from 'class-validator';

export class UpdateTaskStatusDTO {
  @IsEnum(TaskStatus)
  @ApiProperty({
    type: String,
    description: 'One of these OPEN,IN_PROGRESS or DONE',
  })
  status: TaskStatus;
}
