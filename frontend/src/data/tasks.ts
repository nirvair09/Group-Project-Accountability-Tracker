import type { Task } from "../types";

export const tasks: Task[] = [
  {
    id: "t1",
    projectId: "p1",
    title: "Design database schema",
    ownerId: "u1",
    status: "DONE",
    deadline: "2026-02-05T23:59:59Z",
  },
  {
    id: "t2",
    projectId: "p1",
    title: "Implement task service backend",
    ownerId: "u1",
    status: "IN_PROGRESS",
    deadline: "2026-02-08T23:59:59Z",
  },
  {
    id: "t3",
    projectId: "p1",
    title: "Prepare PPT slides",
    ownerId: "u2",
    status: "CREATED",
    deadline: "2026-02-09T23:59:59Z",
  },
  {
    id: "t4",
    projectId: "p1",
    title: "Write project report",
    ownerId: "u3",
    status: "CREATED",
    deadline: "2026-02-10T23:59:59Z",
  },
];
