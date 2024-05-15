import { Hono } from "hono";

// main Hono app
const app = new Hono();

app.get("/", c => {
  return c.json({ "message": "hello" })
})

export default app;
