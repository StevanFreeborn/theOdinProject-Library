import { Book } from './book.js';
const KEY = 'library-books';

/**
 * Uses the given array of books to update the list of books in local storage.
 * @param {Array<Book>} books
 */
function updateBooks(books) {
  localStorage.setItem(KEY, JSON.stringify(books));
}

/**
 * Retrieve an array of books from local storage or just return an empty array if none found.
 * @returns {Array<Book>} An array of books.
 */
export function getBooks() {
  let books = localStorage.getItem(KEY);

  if (books !== null) {
    return JSON.parse(books);
  }

  books = [];
  updateBooks(books);

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
  updateBooks(newBooks);
  return newBooks;
}

export function updateBook({ updatedBook, books }) {
  const updatedBooks = books.map(book =>
    book.id === updatedBook.id ? updatedBook : book
  );
  updateBooks(updatedBooks);
  return updatedBooks;
}

export function deleteBookById({ bookId, books }) {
  const updatedBooks = books.filter(
    book => book.id !== bookId
  );
  updateBooks(updatedBooks);
  return updatedBooks;
}
