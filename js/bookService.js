import { Book } from './book.js';

/**
 * Retrieve an array of books.
 * @returns {Array<Book>} An array of books.
 */
export function getBooks() {
  return [];
}

/**
 * Add a book to an array of books.
 * @param {Book} book - The book to add.
 * @param {Array<Book>} books - The array of books to add the book to.
 * @returns {Array<Book>} A new array of books with the added book.
 */
export function addBook(book, books) {
  return [...books, book];
}
