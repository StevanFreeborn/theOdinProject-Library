import { jest } from '@jest/globals';
import * as bookService from '../js/bookService.js';
import { BOOKS_KEY } from '../js/constants.js';

describe('bookService', () => {
  describe('getBooks', () => {
    beforeEach(() => {
      localStorage.clear();
      jest.restoreAllMocks();
    });

    test('should return an empty array if no books are in local storage', () => {
      const books = bookService.getBooks();
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

      const books = bookService.getBooks();

      expect(books).toEqual(storedBooks);
    });

    test('should store an empty array in local storage and return it if no books are in local storage', () => {
      const books = bookService.getBooks();
      const storedBooks = JSON.parse(
        localStorage.getItem(BOOKS_KEY)
      );

      expect(books).toEqual([]);
      expect(storedBooks).toEqual([]);
    });
  });

  describe('updateBooks', () => {
    beforeEach(() => {
      localStorage.clear();
    });

    test('should set the books array to local storage', () => {
      const books = [
        { title: 'Book 1', author: 'Author 1' },
        { title: 'Book 2', author: 'Author 2' },
        { title: 'Book 3', author: 'Author 3' },
      ];

      bookService.updateBooks({ books });

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

      bookService.updateBooks({ books: newBooks });

      const storedBooks = JSON.parse(
        localStorage.getItem(BOOKS_KEY)
      );

      expect(storedBooks).toEqual(newBooks);
    });
  });
});
