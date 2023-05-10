import { Book } from './book.js';
const KEY = 'library-books';

/**
 * Retrieve an array of books.
 * @returns {Array<Book>} An array of books.
 */
export function getBooks() {
  let books = localStorage.getItem(KEY);

  if (books !== null) {
    return JSON.parse(books);
  }

  books = [];
  localStorage.setItem(KEY, JSON.stringify(books));

  return books;
}

/**
 * Add a book to an array of books.
 * @param {Book} book - The book to add.
 * @param {Array<Book>} books - The array of books to add the book to.
 * @returns {Array<Book>} A new array of books with the added book.
 */
export function addBook({ book, books }) {
  const newBooks = [...books, book];
  localStorage.setItem(KEY, JSON.stringify(newBooks));
  return newBooks;
}

export function updateBook({ updatedBook, books }) {
  const updatedBooks = books.map(book =>
    book.id === updatedBook.id ? updatedBook : book
  );
  localStorage.setItem(KEY, JSON.stringify(updatedBooks));
  return updatedBooks;
}

export function deleteBookById({ bookId, books }) {
  const updatedBooks = books.filter(
    book => book.id !== bookId
  );
  localStorage.setItem(KEY, JSON.stringify(updatedBooks));
  return updatedBooks;
}
