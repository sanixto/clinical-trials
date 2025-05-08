export async function apiGet<T>(path: string, params?: URLSearchParams) {
  let url = path;

  if (params) {
    url += `?${params.toString()}`;
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.json() as Promise<T>;
}

export async function apiPost<T>(path: string, data: T) {
  return fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
