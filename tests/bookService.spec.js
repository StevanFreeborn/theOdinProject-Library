import {
  addBook,
  deleteBookById,
  getBooks,
  updateBook,
  updateBooks,
} from '../js/bookService.js';
import { BOOKS_KEY } from '../js/constants.js';

describe('bookService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getBooks', () => {
    test('should return an empty array if no books are in local storage', () => {
      const books = getBooks();
      expect(books).toEqual([]);
    });

    test('should return an array of books from local storage', () => {
      const storedBooks = [
        { title: 'Book 1', author: 'Author 1' },
        { title: 'Book 2', author: 'Author 2' },
        { title: 'Book 3', author: 'Author 3' },
      ];

      localStorage.setItem(
        BOOKS_KEY,
        JSON.stringify(storedBooks)
      );

      const books = getBooks();

      expect(books).toEqual(storedBooks);
    });

    test('should store an empty array in local storage and return it if no books are in local storage', () => {
      const books = getBooks();
      const storedBooks = JSON.parse(
        localStorage.getItem(BOOKS_KEY)
      );

      expect(books).toEqual([]);
      expect(storedBooks).toEqual([]);
    });
  });

  describe('addBook', () => {
    const book1 = { title: 'Book 1', author: 'Author 1' };
    const book2 = { title: 'Book 2', author: 'Author 2' };
    const books = [book1];

    it('should return a new array with the added book', () => {
      const newBooks = addBook({ book: book2, books });
      expect(newBooks).toEqual([...books, book2]);
    });

    it('should not modify the original array of books', () => {
      addBook({ book: book2, books });
      expect(books).toEqual([book1]);
    });
  });

  describe('updateBook', () => {
    let books;

    beforeEach(() => {
      books = [
        { id: 1, title: 'Book 1' },
        { id: 2, title: 'Book 2' },
        { id: 3, title: 'Book 3' },
      ];
    });

    it('should update the book with the given id', () => {
      const updatedBook = {
        id: 2,
        title: 'Updated Book 2',
      };

      const result = updateBook({ updatedBook, books });

      expect(result).toEqual([
        { id: 1, title: 'Book 1' },
        { id: 2, title: 'Updated Book 2' },
        { id: 3, title: 'Book 3' },
      ]);
    });

    it('should not update any book if the given id is not found', () => {
      const updatedBook = { id: 4, title: 'New Book' };

      const result = updateBook({ updatedBook, books });

      expect(result).toEqual([
        { id: 1, title: 'Book 1' },
        { id: 2, title: 'Book 2' },
        { id: 3, title: 'Book 3' },
      ]);
    });

    it('should return a new array of books', () => {
      const updatedBook = {
        id: 2,
        title: 'Updated Book 2',
      };

      const result = updateBook({ updatedBook, books });

      expect(result).not.toBe(books);
    });
  });

  describe('deleteBookById', () => {
    let books;
    let bookId;
    beforeEach(() => {
      books = [
        { id: '1', title: 'Book 1' },
        { id: '2', title: 'Book 2' },
        { id: '3', title: 'Book 3' },
      ];
      bookId = '2';
    });

    it('should remove the book with the given id from the array of books', () => {
      const result = deleteBookById({ bookId, books });
      expect(result).toHaveLength(2);
      expect(
        result.find(book => book.id === bookId)
      ).toBeUndefined();
    });

    it('should return a new array of books without the deleted book', () => {
      const result = deleteBookById({ bookId, books });
      expect(result).not.toBe(books);
    });

    it('should not modify the original array of books', () => {
      const result = deleteBookById({ bookId, books });
      expect(books).toHaveLength(3);
      expect(books).toEqual([
        { id: '1', title: 'Book 1' },
        { id: '2', title: 'Book 2' },
        { id: '3', title: 'Book 3' },
      ]);
    });

    it('should return the original array of books if the book with the given id does not exist', () => {
      const result = deleteBookById({ bookId: '4', books });
      expect(result).toEqual(books);
    });
  });

  describe('updateBooks', () => {
    test('should set the books array to local storage', () => {
      const books = [
        { title: 'Book 1', author: 'Author 1' },
        { title: 'Book 2', author: 'Author 2' },
        { title: 'Book 3', author: 'Author 3' },
      ];

      updateBooks({ books });

      const storedBooks = JSON.parse(
        localStorage.getItem(BOOKS_KEY)
      );

      expect(storedBooks).toEqual(books);
    });

    test('should overwrite the previous books array in local storage', () => {
      const initialBooks = [
        { title: 'Initial Book', author: 'Initial Author' },
      ];

      localStorage.setItem(
        BOOKS_KEY,
        JSON.stringify(initialBooks)
      );

      const newBooks = [
        { title: 'New Book', author: 'New Author' },
        {
          title: 'Another New Book',
          author: 'Another New Author',
        },
      ];

      updateBooks({ books: newBooks });

      const storedBooks = JSON.parse(
        localStorage.getItem(BOOKS_KEY)
      );

      expect(storedBooks).toEqual(newBooks);
    });
  });
});
