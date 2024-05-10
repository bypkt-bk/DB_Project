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
// user.get('/search', async (c) =>{
//     const name = c.req.query('name')
//     console.log(name)
//     const result : User[] = await prisma.user.findMany({
//         where : {  
//             OR:[
//                 {
//                     first_name:{contains:name}
//                 },
//                 {
//                     last_name:{contains:name}
//                 }
//             ]
//         }
//     })
//     console.log(result)
//     if (result.length !== 0){
//         return c.json({result});
//     }
//     return c.json({result : "not found"}, 404);


// }) 


interface UserInput {
    first_name  : String,
    last_name   : String,
    email       : String,
    phone_number : String
}

user.post("/", async (c) => {
    const input: UserInput = await c.req.json();
    const latestQuery = await prisma.user.findMany({
        orderBy:[{
            user_id:"desc"
        }],
        take: 1
    });

    const user_id = latestQuery[0].user_id;
    await prisma.user.create({
        data: {
            user_id     :user_id + 1,
            first_name  : input.first_name.toString(),
            last_name   : input.last_name.toString(),
            email       : input.email.toString() ,
            phone_number : input.phone_number.toString()

              }
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


interface UserInput_delete {
    user_id: number;
}
user.delete("/", async (c) => {
    const input: UserInput_delete = await c.req.json();
    await prisma.user.delete({
        where:{
            user_id: input.user_id
        }
    });

    return c.text("Create success");

});
// user.delete("/delete", async (c) =>{
//     const input : User = await c.req.json();
//     const User = await prisma.user.delete({
//         where: { 
//             user_id : input.user_id 
//         },
//       })
//       return c.json({result : "Delete success"}, 200)
// })




export default user;
