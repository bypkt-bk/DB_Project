import { PrismaClient, User } from "@prisma/client";
import { Hono } from "hono";
import user from "./db/user";
import loan from "./db/loan";
import hold from "./db/hold";

const app = new Hono();
const prisma = new PrismaClient();

app.get("/", (c) => {
  return c.text("hello");
});

app.route('/user', user);
app.route("/loan", loan);
app.route("/hold", hold);

export default app;
