import { Router } from "express";
import * as controller from "./controller";
import { authenticate } from "./middleware/auth";

const router = Router();

router.post("/tasks", authenticate, controller.createTaskController);

router.patch("/tasks/:id/status", authenticate, controller.updateTaskStatusController);

router.get("/projects/:projectId/tasks", authenticate, controller.getTask);

router.get("/projects/:projectId/activity", authenticate, controller.getProjectActivityController);

router.get("/activity", authenticate, controller.getAllActivityController);

router.get("/tasks/mine", authenticate, controller.getMyTasks);

router.patch("/tasks/:id/approve", authenticate, controller.approveTaskController);

export default router;
