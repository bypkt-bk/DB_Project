import { Genre, PrismaClient } from "@prisma/client";
import { Hono } from "hono";
const genre = new Hono();
const prisma = new PrismaClient();

    genre.get("/", async (c) => {
        const result = await prisma.genre.findMany();
        return c.json({ result });
    });
    genre.get("/:genre_name", async (c) => {
        const name = c.req.param("genre_name");
        const result = await prisma.genre.findMany({
            where: {
                genre_name:name
            },
            include:{
                books:true
            }
        });
        return c.json({ result });
    });

    genre.post("/", async (c) => {
        const input: Genre = await c.req.json();
    
        await prisma.genre.create({
            data:input
        });
    
        return c.text("Create success");
    });
    
    genre.delete("/",async (c) =>{
        const data = await c.req.json<Genre>();
        await prisma.genre.delete({
            where: {
                genre_id: data.genre_id,
            },
        });
        return c.json({ message: "Delete success" });
    });

    genre.patch("/", async (c) => {
        const data = await c.req.json<Genre>();
      
        await prisma.genre.update({
          where: {
            genre_id: data.genre_id,
          },
          data: {
            genre_name: data.genre_name,
          },
        });
        return c.json({ message: "update success" });
    })

export default genre;