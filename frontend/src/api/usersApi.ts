import { users } from "../data/users";
import type { User } from "../types";

export function getUsers(): Promise<User[]> {
  return Promise.resolve(users);
}

export function getUserById(id: string): Promise<User | undefined> {
  return Promise.resolve(users.find((u) => u.id === id));
}
