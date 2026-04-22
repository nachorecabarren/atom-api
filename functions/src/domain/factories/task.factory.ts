import { Task, TaskStatus } from "../entities/task.entity";
import { v4 as uuidv4 } from "uuid";

export class TaskFactory {
  static create(title: string, description: string, userId: string): Task {
    return new Task(
      uuidv4(),
      title,
      description,
      TaskStatus.PENDING,
      new Date(),
      userId,
    );
  }
}
