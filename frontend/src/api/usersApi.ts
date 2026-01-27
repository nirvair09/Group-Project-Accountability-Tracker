import { apiFetch } from "./http";

const BASE = "http://localhost:4001";

export function searchUsers(query: string, token: string) {
  return apiFetch(
    `${BASE}/users/search?q=${query}`,
    {},
    token
  );
}
