import { PrismaClient, User } from "@prisma/client";
import { Hono } from "hono";

const user = new Hono();
const prisma = new PrismaClient();


user.get("/", async (c) => {
    const result = await prisma.user.findMany();
    return c.json({ result });
  });

user.get('/search', async (c) =>{
    const name = c.req.query('name')
    const result : User[] = await prisma.user.findMany({
        where : {  
            first_name : {contains : name},
            last_name : {contains : name}
        }
    })
    console.log(result)
    if (result.length !== 0){
        return c.json({result});
    }
    return c.json({result : "not found"}, 404);


}) 


user.post("/", async (c) => {
  const input: User = await c.req.json();

  await prisma.user.create({
    data: input,
  });

  return c.text("Create success");
});



user.patch("/update", async (c) =>{
    const input : User = await c.req.json();

    const update_user = await prisma.user.update({
        where :{
            user_id : input.user_id
        },
        data : {
            first_name : input.first_name,
            last_name : input.last_name,
            email: input.email,
            phone_number: input.phone_number
      
        }
      
    })
    return c.json({result : "Update success"}, 200);
})

user.delete("/delete", async (c) =>{
    const input : User = await c.req.json();
    const User = await prisma.user.delete({
        where: { 
            user_id : input.user_id 
        },
      })
      return c.json({result : "Delete success"}, 200)
})




export default user;
