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



// user.get("/:param", async (c) => {
//   const param = c.req.param("param");

//   if (!isNaN(Number(param))) {
//       // If the parameter is a number, assume it's an ID
//       const result = await prisma.user.findUnique({
//           where: {
//               user_id: Number.parseInt(param),
//           },
//       });
//       if (result) {
//           return c.json({ result });
//       } else {
//           return c.json({ result: "not found" }, 404);
//       }
//   } else {
//       // If the parameter is not a number, assume it's a name
//       const result = await prisma.user.findMany({
//           where: {
//               OR: [
//                   {
//                       first_name: { contains: param }
//                   },
//                   {
//                       last_name: { contains: param }
//                   }
//               ]
//           }
//       });
//       if (result.length !== 0) {
//           return c.json({ result });
//       } else {
//           return c.json({ result: "not found" }, 404);
//       }
//   }
// });


export default user;