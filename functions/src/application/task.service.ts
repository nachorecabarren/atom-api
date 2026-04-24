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
    try {
      const task = TaskFactory.create(title, description, userId);
      return await this.taskRepository.create(task);
    } catch (error) {
      console.error("Error creating task:", error);
      throw new Error("Could not create task");
    }
  }

  async findTasksByUser(userId: string): Promise<Task[]> {
    try {
      return await this.taskRepository.findAllByUser(userId);
    } catch (error) {
      console.error("Error fetching tasks for user:", error);
      throw new Error("Could not fetch tasks");
    }
  }

  async findTaskById(id: string): Promise<Task | null> {
    try {
      return await this.taskRepository.findById(id);
    } catch (error) {
      console.error("Error fetching task by id:", error);
      throw new Error("Could not fetch task");
    }
  }

  async updateTask(
    id: string,
    title: string,
    description: string,
  ): Promise<Task | null> {
    try {
      const task = await this.taskRepository.findById(id);
      if (!task) return null;
      task.title = title;
      task.description = description;
      return await this.taskRepository.update(task);
    } catch (error) {
      console.error("Error updating task:", error);
      throw new Error("Could not update task");
    }
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task | null> {
    try {
      const task = await this.taskRepository.findById(id);
      if (!task) {
        return null;
      }
      task.status = status;
      await this.taskRepository.update(task);
      return task;
    } catch (error) {
      console.error("Error updating task status:", error);
      throw new Error("Could not update task status");
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await this.taskRepository.delete(id);
    } catch (error) {
      console.error("Error deleting task:", error);
      throw new Error("Could not delete task");
    }
  }
}
