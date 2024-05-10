import { PrismaClient, User } from "@prisma/client";
import { Hono } from "hono";

const user = new Hono();
const prisma = new PrismaClient();


user.get("/", async (c) => {
    const result = await prisma.user.findMany();
    return c.json({ result });
  });

  user.get("/:id", async (c) => {
    const userId = parseInt(c.req.param('id'));
    const user = await prisma.user.findUnique({
        where: {
            user_id: userId
        }
    });
    if (!user) {
        return c.json({ error: 'user not found' }, 404);
    }
    return c.json({ user });
});

user.get('/search', async (c) =>{
    const name = c.req.query('name')
    console.log(name)
    const result : User[] = await prisma.user.findMany({
        where : {  
            OR:[
                {
                    first_name:{contains:name}
                },
                {
                    last_name:{contains:name}
                }
            ]
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


user.patch("/update", async (c) => {
    const input: Partial<User> & { user_id: number } = await c.req.json();

    try {
        // Retrieve the existing user record
        const existingUser = await prisma.user.findUnique({
            where: {
                user_id: input.user_id,
            },
        });

        // Check if the user exists
        if (!existingUser) {
            return c.json({ error: "User not found" }, 404);
        }

        // Remove the user_id from the input data before updating
        const { user_id, ...userData } = input;

        // Update only the fields provided in the request body
        const updateUser = await prisma.user.update({
            where: {
                user_id: input.user_id,
            },
            data: userData,
        });

        return c.json({ result: "Update success", updateUser }, 200);
    } catch (error) {
        console.error(error);
        return c.json({ error: "Failed to update user" }, 500);
    }
});


// user.patch("/update", async (c) =>{
//     const input : User = await c.req.json();

//     const update_user = await prisma.user.update({
//         where :{
//             user_id : input.user_id
//         },
//         data : {
//             first_name : input.first_name,
//             last_name : input.last_name,
//             email: input.email,
//             phone_number: input.phone_number
      
//         }
      
//     })
//     return c.json({result : "Update success"}, 200);
// })

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
