export type User = {
  id: string;
  name: string;
};

export type Project = {
  id: string;
  name: string;
};

export type TaskStaus = "CREATED" | "IN_PROGRESS" | "DONE" | "CANCELLED";

export type Task = {
  id: string;
  projqectId: string;
  title: string;
  ownerId: string;
  status: TaskStaus;
};
