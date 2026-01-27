export async function apiFetch(
  url: string,
  options: RequestInit = {},
  token?: string
) {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}
