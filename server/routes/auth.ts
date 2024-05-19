import { Hono } from "hono";
import { getUser, kindeClient, sessionManager } from "../kinde";



export const authRoute = new Hono()
  // login
  .get("/login", async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c));
    return c.redirect(loginUrl.toString());
  })
  // register
  .get("/register", async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c));
    return c.redirect(registerUrl.toString());
  })
  // callback
  .get("/callback", async (c) => {
    const url = new URL(c.req.url);
    await kindeClient.handleRedirectToApp(sessionManager(c), url);
    return c.redirect("/");
  })
  .get("/logout", async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c));
    return c.redirect(logoutUrl.toString());
  })
  .get("/me", getUser, async (c) => {
    const user = c.var.user;
    return c.json(user)
  })
