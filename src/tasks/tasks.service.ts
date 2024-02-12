import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  // private tasks: Task[] = []; wewill use database instread
  // give private accessor because we don't want anyone of another class change tasks
  // see first form that was hidden
  /*
  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilters(filterDto: GetTasksFilterDTO): Task[] {
    const { status, search } = filterDto;

    // define a temp array to hold result
    let tasks = this.getAllTasks();
    // do something with result
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    // do some this with status
    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
        ) {
          return true;
        }
        return false;
      });
    }
    // return final result
    return tasks;
  }

  createTask(createTaskDTO: CreateTaskDTO): Task {
    const { title, description } = createTaskDTO;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    // try to get task

    // if not found, throw am error (404 not found)

    // otherwise, return the found task

    const found = this.tasks.find((task) => id === task.id);

    if (!found) {
      throw new NotFoundException(`Task with id:${id} not found`);
    }

    return found;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
  */

  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: TaskRepository,
  ) {}

  getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ id, user });
    if (!found) {
      throw new NotFoundException(`Task with id:${id} not found`);
    }
    return found;
  }

  async createTask(createTaskDTO: CreateTaskDTO, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDTO, user);
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const result = await this.tasksRepository.delete({ id, user });
    console.log(result); // DeleteResult { raw: [], affected: 0 or more } we will use affected property to track is can it find task to delete or not found?
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id:${id} not found`);
    }
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);

    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }
}
