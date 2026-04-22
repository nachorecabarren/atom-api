import { ITaskRepository } from "../domain/repositories/task.respository";
import { TaskFactory } from "../domain/factories/task.factory";
import { Task, TaskStatus } from "../domain/entities/task.entity";

export class TaskService {
  constructor(private taskRepository: ITaskRepository) {}


  async createTask(
    title: string,
    description: string,
    userId: string,
  ): Promise<Task> {
    const task = TaskFactory.create(title, description, userId);
    await this.taskRepository.create(task);
    return task;
  }

  async findTasksByUser(userId: string): Promise<Task[]> {
    return await this.taskRepository.findAllByUser(userId);
  }

  async findTaskById(id: string): Promise<Task | null> {
    return await this.taskRepository.findById(id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task | null> {
    const task = await this.taskRepository.findById(id);
    if (!task) {
      return null;
    }
    task.status = status;
    await this.taskRepository.update(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
