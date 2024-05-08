import { Hono } from 'hono'
import book from './book/book'
import genre from './genre/genre'
import Library_books from './library_books/Library_books'
import library from './library/library'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/book', book)
app.route('/genre', genre)
app.route('/library', library)
app.route('/library_books', Library_books)
export default app
