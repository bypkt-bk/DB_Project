import { Hono } from "hono";
import { PrismaClient, Hold } from "@prisma/client";

const hold = new Hono();
const prisma = new PrismaClient();


hold.get("/", async (c) => {
    const result = await prisma.hold.findMany({
        include:{
            user:true
        }
    });
    return c.json({ result });
  });



hold.post("/", async (c) => {
  const input: Hold = await c.req.json();

  console.log(input)

  await prisma.hold.create({
    data: input,
  });
  return c.text("Create success");
});


hold.delete("/delete", async (c) =>{
    const input :Hold = await c.req.json();
    const Hold = await prisma.hold.delete({
        where: { 
             hold_id: input.hold_id
        },
      })
      return c.json({result : "Delete success"}, 200)
})


export default hold;