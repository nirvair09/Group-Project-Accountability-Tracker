import { Router } from "express";
import * as controller from "./controller";
import { authenticate } from "./middleware/auth";

const router = Router();

router.post("/tasks", authenticate, controller.createTaskController);

router.patch("/tasks/:id/status", authenticate, controller.updateTaskStatusController);

router.get("/projects/:projectId/tasks", authenticate, controller.getTask);

router.get("/tasks/mine", authenticate, controller.getMyTasks);

export default router;
