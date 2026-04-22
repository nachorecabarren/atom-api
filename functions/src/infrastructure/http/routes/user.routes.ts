import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../../../application/user.service";
import {
  UserFirestoreRepository,
} from "../../repositories/user.firestore.repository";

const router = Router();

const userRepository = new UserFirestoreRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/", userController.createUser.bind(userController));
router.get("/:email", userController.findUserByEmail.bind(userController));

export default router;
