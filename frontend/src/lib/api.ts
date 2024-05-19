
// created to share ApiRoute definitions
import type { ApiRoutes } from "@server/app";
import { queryOptions } from "@tanstack/react-query";
import { hc } from 'hono/client';

// client to connect to our backend
// using APiRoutes type
const client = hc<ApiRoutes>('/');

export const api = client.api.v1;

// getUser reusable function
// ---------------------------------------------------------
// getProfile function
// ---------------------------------------------------------
async function getProfile() {
  const data = await api.auth.me.$get();
  if (!data.ok) {
    throw new Error('Server Error');
  }
  const json = await data.json();
  return json
}

export const useQueryOptions = queryOptions({
  queryKey: ["get-profile"],
  queryFn: getProfile,
  staleTime: Infinity
})


