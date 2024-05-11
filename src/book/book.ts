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
    const searchInput = c.req.query('search');
    const filter = c.req.query('filter');

    let whereCondition: any = {
        OR: [
            { title: { contains: searchInput } },
            { author: { contains: searchInput } },
            { library: { library_name: { contains: searchInput } } },
            { genre: { genre_name: { contains: searchInput } } }
        ]
    };

    if (filter === 'title') {
        whereCondition = {
            title: { contains: searchInput }
        } as any;
    } else if (filter === 'author') {
        whereCondition = {
            author: { contains: searchInput }
        } as any;
    } else if (filter === 'genre') {
        whereCondition = {
            genre: { genre_name: { contains: searchInput } }
        } as any;
    } else if (filter === 'library') {
        whereCondition = {
            library: { library_name: { contains: searchInput } }
        } as any;
    }

    const result = await prisma.book.findMany({
        where: whereCondition,
        include: {
            library: true,
            genre: true
        }
    });
    return c.json({ result });
});
// book.get("/", async (c) => {
//     const author = c.req.query('author');
//     const genre = c.req.query('genre');
//     const library = c.req.query('library');
//     const where = (author || genre || library) ? {
//         ...(author && { author : {contains: author}}),
//         ...(genre && { genre: { genre_name: genre } }),
//         ...(library && {library: {library_name: library}})
//       } : {};

book.get("/", async (c) => {
    const searchInput = c.req.query('search');

    const result = await prisma.book.findMany({
        where: {
            OR: [
                { title: { contains: searchInput } },
                { author: { contains: searchInput } },
                { library: { library_name: { contains: searchInput } } },
                { genre:{genre_name:{ contains:searchInput }}}
            ]
        },
        include: {
            library: true,
            genre: true
        }
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

interface BookInput {
    title: string;
    author: string;
    quantity: number;
    genre_id: number;
    library_id: number;
}

book.post("/", async (c) => {
    const input: BookInput = await c.req.json();
    const latestQuery = await prisma.book.findMany({
        orderBy:[{
            book_id:"desc"
        }],
        take: 1
    });

    const book_id = latestQuery[0].book_id;

    await prisma.book.create({
        data: {
            book_id:book_id + 1,
            title: input.title,
            author: input.author,
            quantity: input.quantity,
            genre_id: input.genre_id,
            library_id: input.library_id

              }
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

interface BookInput_delete {
    book_id: number;
}
book.delete("/", async (c) => {
    const input: BookInput_delete = await c.req.json();
    await prisma.book.delete({
        where:{
            book_id: input.book_id
        }
    });

    return c.text("Create success");

});



export default book;