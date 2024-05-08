import { PrismaClient, User } from "@prisma/client";
import { Hono } from "hono";

const user = new Hono();
const prisma = new PrismaClient();


user.get("/", async (c) => {
    const result = await prisma.user.findMany();
    return c.json({ result });
  });

user.get("/:id", async (c) => {
  const id = c.req.param("id");
  const result = await prisma.user.findMany({
    where: {
      user_id: Number.parseInt(id),
    },
  });
  return c.json({ result });
});

user.post("/", async (c) => {
  const input: User = await c.req.json();

  await prisma.user.create({
    data: input,
  });

  return c.text("Create success");
});





export default user;