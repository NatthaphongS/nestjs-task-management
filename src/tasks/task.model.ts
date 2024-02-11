export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

// enumulation create some set of string we only want for status
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
