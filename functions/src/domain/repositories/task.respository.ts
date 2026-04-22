import { Task } from "../entities/task.entity";

export interface ITaskRepository {
  create(task: Task): Promise<Task>;
  findAllByUser(userId: string): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  update(task: Task): Promise<Task>;
  delete(id: string): Promise<void>;
}
