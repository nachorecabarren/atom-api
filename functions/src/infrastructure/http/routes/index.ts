import { Router } from "express";
import taskRoutes from "./task.routes";
import userRoutes from "./user.routes";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.use("/tasks", authMiddleware, taskRoutes);
router.use("/users", userRoutes);

export default router;
