import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDTO): Task[] {
    // don't need to be the same name in service but many time it make sense to be a same name

    // if we have any filter defined, call taskservice.getTaskWithFilters
    // otherwise, just get all tasks
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTaskWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  // why don't do every thing in controller?
  // because when application grows you will see more ans more business logic your sense will tell you to spilt your code.  so it mush easier to test and maintain and there is a clear place.

  @Get('/:id')
  getTaskById(@Param('id') id): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  // createTask(@Body() body) {
  // (@Body() body) Nestjs will take all of request body add assign it to body parameter as an argument

  //how if we want to select some value?
  // createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  // ) {

  // implement with DTO concept
  createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
    return this.tasksService.createTask(createTaskDTO);
    // return will be a http response
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  // best practice to tell what field to be patch
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
