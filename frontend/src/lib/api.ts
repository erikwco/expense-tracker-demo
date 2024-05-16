
// created to share ApiRoute definitions
import type { ApiRoutes } from "@server/app";
import { hc } from 'hono/client';

// client to connect to our backend
const client = hc<ApiRoutes>('/');

export const api = client.api.v1;
