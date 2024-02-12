import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskRepository } from './tasks.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [TypeOrmModule.forFeature([TaskRepository]), AuthModule],
  // this line allow we inject TaskRepository to any component in this module
})
export class TasksModule {}
