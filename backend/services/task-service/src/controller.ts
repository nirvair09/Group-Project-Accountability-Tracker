import { Request, Response } from "express";
import * as taskService from "./service";
import { createTaskSchema, updateStatusScehma } from "./schema";

export async function createTaskController(req: Request, res: Response) {
  const parsed = createTaskSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error });
  }

  const task = await taskService.createTask(parsed.data);
  return res.status(201).json({ message: "Task created successfully" });
}


export async function updateTaskStatusController(req: Request, res: Response){
    const parsed = updateStatusScehma.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error });
    }

    const userId=req.headers["x-user-id"] as string;
    if(!userId){
        return res.status(400).json({ error: "Missing x-user-id header" });
    }

    await taskService.updateTaskStatus(
        req.params.id as string,
        userId,
        parsed.data.status
    );

    res.json({ message: "Task status updated successfully" });
}
  