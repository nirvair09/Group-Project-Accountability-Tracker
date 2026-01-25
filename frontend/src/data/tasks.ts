import type { Task } from "../types";

export const tasks: Task[] = [
  {
    id: "t1",
    projqectId: "p1",
    title: "Design DB schema",
    ownerId: "u1",
    status: "DONE",
  },
  {
    id: "t2",
    projqectId: "p1",
    title: "Build task service",
    ownerId: "u1",
    status: "IN_PROGRESS",
  },
  {
    id: "t3",
    projqectId: "p1",
    title: "Prepare PPT",
    ownerId: "u2",
    status: "CREATED",
  },
];
