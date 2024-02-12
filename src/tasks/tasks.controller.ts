import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Logger } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TaskController');

  constructor(private tasksService: TasksService) {}

  // see first form(not connect with database) hidden
  /*
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
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
  ): Task {
    const { status } = updateTaskStatusDTO;
    return this.tasksService.updateTaskStatus(id, status);
  }
  */

  @Get()
  @ApiBearerAuth()
  getTasks(
    @Query() filterDto: GetTasksFilterDTO,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User ${user.username} retrieving all tasks. Filter : ${JSON.stringify(filterDto)}`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get('/:id')
  @ApiBearerAuth()
  getTaskById(@Param('id') id: string, @GetUser() user: User): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post()
  @ApiBearerAuth()
  createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO, user);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  @ApiBearerAuth()
  // best practice to tell what field to be patch
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDTO: UpdateTaskStatusDTO,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDTO;
    return this.tasksService.updateTaskStatus(id, status, user);
  }
}
