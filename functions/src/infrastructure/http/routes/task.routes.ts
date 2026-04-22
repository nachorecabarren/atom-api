import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { TaskService } from "../../../application/task.service";
import {
  TaskFirestoreRepository,
} from "../../repositories/task.firestore.repository";

const router = Router();

const taskRepository = new TaskFirestoreRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

router.post("/", taskController.createTask);
router.get("/user/:userId", taskController.getTasksByUser);
router.get("/:id", taskController.getTaskById);
router.delete("/:id", taskController.deleteTask);
router.put("/:id/status", taskController.updateTaskStatus);

export default router;
