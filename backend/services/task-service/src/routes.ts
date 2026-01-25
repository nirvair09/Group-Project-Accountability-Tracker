import { Router } from "express";
import * as controller from "./controller";

const router = Router();

router.post("/tasks", controller.createTaskController);

router.patch("/tasks/:id/status", controller.updateTaskStatusController);

router.get("/projects/:projectId/tasks", controller.getTask);

export default router;
