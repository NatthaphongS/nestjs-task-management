// export interface Task {
//   id: string;
//   title: string;
//   description: string;
//   status: TaskStatus;
// }
// not use after connect database and change flie name task.model.ts=>task-status.enum.ts

// enumulation create some set of string we only want for status
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
