import { Library_books, PrismaClient } from "@prisma/client";
import { Hono } from "hono";
const library_books = new Hono();
const prisma = new PrismaClient();

library_books.get("/", async (c) => {
    const result = await prisma.library_books.findMany();
    return c.json({ result });
});

library_books.delete("/",async (c) =>{
    const data = await c.req.json<Library_books>();
    await prisma.library_books.delete({
        where: {
            lib_book_id: data.lib_book_id,
        },
    });
    return c.json({ message: "Delete success" });
});

library_books.post("/", async (c) => {
    const input: Library_books = await c.req.json();

    await prisma.library_books.create({
        data:input
    });

    return c.text("Create success");
});

library_books.get("/:library_books", async (c) => {
    const name = c.req.param("library_books");
    const result = await prisma.library_books.findMany({
        where: {
            //libraries:name
        },
        include:{
            books:true
        }
    });
    return c.json({ result });
});

export default library_books;