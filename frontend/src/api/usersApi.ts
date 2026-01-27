import { apiFetch } from "./http";

export function searchUsers(query: string, token: string) {
  return apiFetch(
    `http://localhost:4001/users/search?q=${query}`,
    {},
    token
  );
}
