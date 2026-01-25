import { Request, Response } from "express";
import * as taskService from "./service";
import { createTaskSchema } from "./schema";

export async function createTaskController(req: Request, res: Response) {
  const parsed = createTaskSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error });
  }

  const task = await taskService.createTask(parsed.data);
  return res.status(201).json({ message: "Task created successfully" });
}
