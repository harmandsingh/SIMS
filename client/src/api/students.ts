export const ENDPOINT = "http://localhost:4000/api/v1";

export const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((res) => res.json());
