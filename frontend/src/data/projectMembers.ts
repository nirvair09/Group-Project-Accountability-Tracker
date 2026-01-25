// Define ProjectMember type here if not exported from ../types
export type ProjectMember = {
  projectId: string;
  userId: string;
  role: "STUDENT" | "FACULTY";
};

export const projectMembers: ProjectMember[] = [
  {
    projectId: "p1",
    userId: "u1",
    role: "STUDENT",
  },
  {
    projectId: "p1",
    userId: "u2",
    role: "STUDENT",
  },
  {
    projectId: "p1",
    userId: "u3",
    role: "STUDENT",
  },
  {
    projectId: "p1",
    userId: "u4",
    role: "FACULTY",
  },
];
