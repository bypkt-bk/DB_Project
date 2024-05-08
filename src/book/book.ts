import { Book, PrismaClient } from "@prisma/client";
import { Hono } from "hono";
const book = new Hono();
const prisma = new PrismaClient();


function a(x: number): number {
    return x + 1;
}

const b = (x: number) => {
    return x + 1;
}

book.get("/", async (c) => {
    const author = c.req.query('author');
    const genre = c.req.query('genre');
    const library = c.req.query('library');
    const where = (author || genre || library) ? {
        ...(author && { author }),
        ...(genre && { genre: { genre_name: genre } }),
        ...(library && {library: {library_name: library}})
      } : {};
    const result = await prisma.book.findMany({
        where: where
    });
    return c.json({ result });
});

book.get("/count", async (c) => {
    const count = await prisma.book.count();
    return c.json({ count });
});


book.get("/:id", async (c) => {
    const bookId = c.req.param('id'); // Extract book ID from route parameter
    const q: string = `SELECT Book.book_id, Library.library_id, Library.library_name
        FROM Book
        INNER JOIN Library_books ON Book.book_id = Library_books.book_id
        INNER JOIN Library ON Library_books.library_id = Library.library_id
        WHERE Book.book_id = ${bookId};`.toString()
    const result = await prisma.$queryRawUnsafe(q);


    return c.json({ result })
});


book.post("/", async (c) => {
    const input: Book = await c.req.json();

    await prisma.book.create({
        data: input
    });

    return c.text("Create success");
});

book.patch("/", async (c) => {
    const data = await c.req.json<Book>();

    await prisma.book.update({
        where: {
            book_id: data.book_id,
        },
        data: {
            title: data.title,
            author: data.author,
            quantity: data.quantity,
            genre_id: data.genre_id,
            library_id: data.library_id
        },
    });
    return c.json({ message: "update success" });
})

book.delete("/", async (c) => {
    const data = await c.req.json<Book>();
    await prisma.book.delete({
        where: {
            book_id: data.book_id,
        },
    });
    return c.json({ message: "Delete success" });
});



export default book;