import { PrismaClient, User } from "@prisma/client";
import { Hono } from "hono";
import { cors } from 'hono/cors'
import user from "./db/user";
import loan from "./db/loan";
import hold from "./db/hold";
import book from "./book/book";
import genre from "./genre/genre";
import library from "./library/library";
import library_books from "./library_books/library_books";

const app = new Hono();

app.use('/*', cors())


app.get("/", (c) => {
  return c.text("hello");
});

app.route('/user', user);
app.route("/loan", loan);
app.route("/hold", hold);

app.route('/book', book)
app.route('/genre', genre)
app.route('/library', library)
app.route('/library_books', library_books)
export default app