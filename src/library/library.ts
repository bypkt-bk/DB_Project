import { Library, PrismaClient } from "@prisma/client";
import { Hono } from "hono";
const library = new Hono();
const prisma = new PrismaClient();

library.get("/:id", async (c) => {
    const libraryId = parseInt(c.req.param('id'));
    const library = await prisma.library.findUnique({
        where: {
            library_id: libraryId
        }
    });
    if (!library) {
        return c.json({ error: 'library not found' }, 404);
    }
    return c.json({ library });
});
interface LibraryInput {
    library_name : string;
   
}

library.post("/", async (c) => {
    const input: LibraryInput = await c.req.json();
    const latestQuery = await prisma.library.findMany({
        orderBy:[{
            library_id:"desc"
        }],
        take: 1
    });

    const library_id = latestQuery[0].library_id;

    await prisma.library.create({
        data: {
            library_id:library_id + 1,
            library_name:input.library_name   
              }
    });

    return c.text("Create success");

library.get("/:id", async (c) => {
    const libraryId = parseInt(c.req.param('id'));
    const library = await prisma.library.findUnique({
        where: {
            library_id: libraryId
        }
    });
    if (!library) {
        return c.json({ error: 'library not found' }, 404);
    }
    return c.json({ library });
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
interface LibraryInput_delete {
    library_id: number;
}
library.delete("/", async (c) => {
    const input: LibraryInput_delete = await c.req.json();
    await prisma.library.delete({
        where:{
            library_id: input.library_id
        }
    });

    return c.text("Create success");

});
// library.delete("/",async (c) =>{
//     const data = await c.req.json<Library>();
//     await prisma.library.delete({
//         where: {
//             library_id: data.library_id,
//         },
//     });
//     return c.json({ message: "Delete success" });
// });

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