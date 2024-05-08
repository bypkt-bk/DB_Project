import { Hono } from 'hono'
import book from './book/book'
import genre from './genre/genre'
import library from './library/library'
import user from './user/user'
import loan from './loan/loan'
import hold from './hold/hold'
import library_books from './library_books/library_books'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/book', book)
app.route('/genre', genre)
app.route('/library', library)
app.route('/library_books', library_books)
app.route('/user', user);
app.route("/loan", loan);
app.route("/hold", hold);
export default app
