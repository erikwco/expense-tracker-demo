import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRoutes } from "./routes/expenses";
import { serveStatic } from "hono/bun";

// main Hono app
const app = new Hono();
// middleware
app.use("*", logger())

// cors middleware will be disabled 
// cause we are using vite-proxy 
// and serving the statict compiled files from 
// hono
// app.use("/api/v1/*", cors({
//   origin: '*',
//   allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
//   allowMethods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PUT'],
//   exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
//   maxAge: 600,
//   credentials: true,
// }))

// expenses routes
app.route("/api/v1/expenses", expenseRoutes)


// default routes
app.get('*', serveStatic({ root: './frontend/dist' }))
app.get('*', serveStatic({ path: './frontend/dist/index.html' }))


// exporting 
export default app;
