import { Request, Response } from "express";
import { TaskService } from "../../../application/task.service";
import { TaskStatus } from "../../../domain/entities/task.entity";

type Params = {
  userId: string; // User Id for get tasks by user.
  id: string; // Task Id.
};

export class TaskController {
  constructor(private taskService: TaskService) {}

  async createTask(req: Request, res: Response) {
    try {
      const { title, description, userId } = req.body;

      if (!title || !description || !userId) {
        return res.status(400).json({ message: "Missing fields" });
      }

      const task = await this.taskService.createTask(
        title,
        description,
        userId,
      );

      return res.status(201).json(task);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Server error";
      return res.status(500).json({ message });
    }
  }

  async getTasksByUser(req: Request<Params>, res: Response) {
    try {
      const { userId } = req.params;

      const tasks = await this.taskService.findTasksByUser(userId);

      return res.status(200).json(tasks);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Server error";
      return res.status(500).json({ message });
    }
  }

  async getTaskById(req: Request<Params>, res: Response) {
    try {
      const { id } = req.params;

      const task = await this.taskService.findTaskById(id);

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json(task);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Server error";
      return res.status(500).json({ message });
    }
  }

  async updateTask(req: Request<Params>, res: Response) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!title || !description) {
        return res.status(400).json({ message: "Missing fields" });
      }

      const updatedTask = await this.taskService.updateTask(
        id,
        title,
        description,
      );

      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json(updatedTask);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Server error";
      return res.status(500).json({ message });
    }
  }

  async updateTaskStatus(req: Request<Params>, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!Object.values(TaskStatus).includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const updatedTask = await this.taskService.updateTaskStatus(id, status);

      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      return res.status(200).json(updatedTask);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Server error";
      return res.status(500).json({ message });
    }
  }

  async deleteTask(req: Request<Params>, res: Response) {
    try {
      const { id } = req.params;

      await this.taskService.deleteTask(id);

      return res.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Server error";
      return res.status(500).json({ message });
    }
  }
}
