import { Book } from './book.js';
import {
  addBook,
  deleteBookById,
  getBooks,
  updateBook,
} from './bookService.js';

window.addEventListener('DOMContentLoaded', e => {
  const books = getBooks();
  const booksContainer = document.getElementById(
    'books-container'
  );
  renderBooks({ booksContainer, books });

  document
    .getElementById('add-book-button')
    .addEventListener('click', handleAddClick);
});

/**
 * Renders a list of books in the given element.
 * @param {Object} data - The object that contains the functions parameters.
 * @param {HTMLElement} data.booksContainer - The HTML element where the book list will be rendered.
 * @param {Array<Book>} data.books - An array of book objects.
 */
function renderBooks({ booksContainer, books }) {
  booksContainer.innerHTML = '';
  books.forEach(book => {
    const bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.id = book.id;

    const bookFormElement = document.createElement('form');
    bookFormElement.setAttribute('data-book-id', book.id);
    bookFormElement.classList.add('book-form');
    bookFormElement.onsubmit = handleBookEditSubmit;

    const isBeingEdited = book.editing === true;

    bookFormElement.innerHTML = `
      <input 
        ${isBeingEdited ? '' : 'readonly'}
        name="title"
        type="text" 
        value="${book.title}" 
      />
      <input 
        ${isBeingEdited ? '' : 'readonly'}
        name="author"
        type="text" 
        value="${book.author}" 
      />
      <input 
        ${isBeingEdited ? '' : 'readonly'}
        name="pages"
        type="number" 
        value="${book.pages}" 
      />
      <div>
        <input
          ${isBeingEdited ? '' : 'disabled'} 
          id="${book.id}-read" 
          name="read" 
          type="checkbox" 
          value="${book.read}"
          ${book.read ? 'checked' : ''}
        />
        <label for="${book.id}-read">Read</label>
      </div>
      <div class="book-buttons">
        <button 
          type="button" 
          data-book-id="${book.id}" 
          class="edit-button ${
            isBeingEdited ? 'hidden' : ''
          }"
        >
          Edit
        </button>
        <button 
          type="submit" 
          data-book-id="${book.id}"
          class="save-button ${
            isBeingEdited ? '' : 'hidden'
          }"
        >
          Save
        </button>
        <button 
          type="button" 
          data-book-id="${book.id}" 
          class="delete-button"
        >
          Delete
        </button>
      </div>
    `;

    bookElement.onclick = function (e) {
      if (e.target.classList.contains('edit-button')) {
        handleEditClick(e);
      }
      if (e.target.classList.contains('delete-button')) {
        handleDeleteClick(e);
      }
    };

    bookElement.appendChild(bookFormElement);
    booksContainer.appendChild(bookElement);
  });
}

function handleAddClick(e) {
  const booksContainer = document.getElementById(
    'books-container'
  );
  const book = new Book({
    title: '',
    author: '',
    pages: 0,
    read: false,
  });

  const books = getBooks();
  const updatedBooks = addBook({ book, books });
  renderBooks({ booksContainer, books: updatedBooks });
}

function handleEditClick(e) {
  const booksContainer = document.getElementById(
    'books-container'
  );

  const books = getBooks();

  const book = books.find(
    book => book.id === e.target.dataset.bookId
  );

  const booksNotBeingEdited = books.map(book => {
    book.editing = false;
    return book;
  });

  const bookBeingEdited = {
    ...book,
    editing: true,
  };

  const updatedBooks = updateBook({
    updatedBook: bookBeingEdited,
    books: booksNotBeingEdited,
  });

  renderBooks({ booksContainer, books: updatedBooks });
}

function handleBookEditSubmit(e) {
  e.preventDefault();
  const booksContainer = document.getElementById(
    'books-container'
  );

  const books = getBooks();

  const book = books.find(
    book => book.id === e.target.dataset.bookId
  );

  const bookUpdates = Object.fromEntries(
    new FormData(e.target).entries()
  );

  const updatedBook = {
    ...book,
    ...bookUpdates,
    read: bookUpdates.read ? true : false,
    editing: false,
  };

  const updatedBooks = updateBook({
    updatedBook,
    books,
  });

  renderBooks({ booksContainer, books: updatedBooks });
}

function handleDeleteClick(e) {
  const booksContainer = document.getElementById(
    'books-container'
  );

  const books = getBooks();

  const updatedBooks = deleteBookById({
    bookId: e.target.dataset.bookId,
    books,
  });

  renderBooks({ booksContainer, books: updatedBooks });
}
