import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRoutes } from "./routes/expenses";

// main Hono app
const app = new Hono();
// middleware
app.use("*", logger())

// default routes
app.get("/", c => {
  return c.json({ "message": "Welcome to expense tracker" })
})

// expenses routes
app.route("/api/v1/expenses", expenseRoutes)


export default app;
