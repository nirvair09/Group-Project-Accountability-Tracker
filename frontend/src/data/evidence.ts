import type { EvidenceEvent } from "../types";

export const evidenceEvents: EvidenceEvent[] = [
  {
    id: "e1",
    projectId: "p1",
    userId: "u1",
    type: "TASK_CREATED",
    timestamp: "2026-02-01T09:10:00Z",
    metadata: {
      taskId: "t1",
      title: "Design database schema",
    },
  },
  {
    id: "e2",
    projectId: "p1",
    userId: "u1",
    type: "TASK_STATUS_CHANGED",
    timestamp: "2026-02-02T14:30:00Z",
    metadata: {
      taskId: "t1",
      from: "CREATED",
      to: "DONE",
    },
  },
  {
    id: "e3",
    projectId: "p1",
    userId: "u1",
    type: "TASK_CREATED",
    timestamp: "2026-02-03T10:00:00Z",
    metadata: {
      taskId: "t2",
      title: "Implement task service backend",
    },
  },
  {
    id: "e4",
    projectId: "p1",
    userId: "u2",
    type: "TASK_CREATED",
    timestamp: "2026-02-04T18:20:00Z",
    metadata: {
      taskId: "t3",
      title: "Prepare PPT slides",
    },
  },
  {
    id: "e5",
    projectId: "p1",
    userId: "u3",
    type: "TASK_CREATED",
    timestamp: "2026-02-09T22:50:00Z",
    metadata: {
      taskId: "t4",
      title: "Write project report",
    },
  },
];
