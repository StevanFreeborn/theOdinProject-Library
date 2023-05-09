import { Book } from '../js/book';

describe('Book', () => {
  test('creates a new Book instance with correct properties', () => {
    const book = new Book({
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      pages: 208,
      read: false,
    });

    expect(book.title).toBe('The Alchemist');
    expect(book.author).toBe('Paulo Coelho');
    expect(book.pages).toBe(208);
    expect(book.read).toBe(false);
  });

  test('info() returns the correct string when book has been read', () => {
    const book = new Book({
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      pages: 208,
      read: true,
    });

    expect(book.info()).toBe(
      'The Alchemist, 208 pages, read'
    );
  });

  test('info() returns the correct string when book has not been read', () => {
    const book = new Book({
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      pages: 208,
      read: false,
    });

    expect(book.info()).toBe(
      'The Alchemist, 208 pages, not read yet'
    );
  });
});
