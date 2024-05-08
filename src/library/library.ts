import { Library, PrismaClient } from "@prisma/client";
import { Hono } from "hono";
const library = new Hono();
const prisma = new PrismaClient();

library.get("/", async (c) => {
    const result = await prisma.library.findMany();
    return c.json({ result });
});
library.post("/", async (c) => {
    const input: Library = await c.req.json();

    await prisma.library.create({
        data:input
    });

    return c.text("Create success");
});

library.delete("/",async (c) =>{
    const data = await c.req.json<Library>();
    await prisma.library.delete({
        where: {
            library_id: data.library_id,
        },
    });
    return c.json({ message: "Delete success" });
});

library.patch("/", async (c) => {
    const data = await c.req.json<Library>();
    await prisma.library.update({
      where: {
        library_id: data.library_id,
      },
      data: {
        library_name: data.library_name,
      },
    });
    return c.json({ message: "update success" });
})

library.get("/:library_name", async (c) => {
    const name = c.req.param("library_name");
    const result = await prisma.library.findMany({
        where: {
            books:{
                some:{
                    library:{
                        library_name:name
                    }
                }}
        },
        include:{
            books:true,
        }
    });
    return c.json({ result });
});
export default library;