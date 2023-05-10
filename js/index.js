import { Book } from './book.js';
import { addBook, getBooks } from './bookService.js';

window.addEventListener('DOMContentLoaded', e => {
  const books = getBooks();
  const booksContainer = document.getElementById(
    'books-container'
  );
  renderBooks(booksContainer, books);

  document
    .getElementById('add-book-button')
    .addEventListener('click', e => {
      // TODO: Update to allow adding book dynamically
      const book = new Book({
        title: 'Hello World',
        author: 'Test',
        pages: 100,
        read: true,
      });
      const updatedBooks = addBook(book, books);
      renderBooks(booksContainer, updatedBooks);
    });
});

/**
 * Renders a list of books in the given element.
 * @param {HTMLElement} booksContainer - The HTML element where the book list will be rendered.
 * @param {Array<Book>} books - An array of book objects.
 */
function renderBooks(booksContainer, books) {
  books.forEach(book => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.id = book.id;
    bookElement.innerHTML = `
      <div class="book-title">${book.title}</div>
      <div class="book-details">
        <div>${book.author}</div>
        <div>${book.pages}</div>
        <div>${book.read}</div>
      </div>
    `;
    booksContainer.appendChild(bookElement);
  });
}
