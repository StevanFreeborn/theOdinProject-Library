/**
 * @constructor - Creates a new Book object with the specified properties.
 * @param {object} bookData - The data object that contains the properties for the book.
 * @param {string} bookData.title - The title of the book.
 * @param {string} bookData.author - The author of the book.
 * @param {number} bookData.pages - The number of pages in the book.
 * @param {boolean} bookData.read - A flag indicating whether the book has been read or not.
 * @returns {Book} A new Book object with the specified properties.
 */
export function Book({ title, author, pages, read }) {
  this.id = Math.random().toString(16).slice(2);
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.editing = true;
  this.info = function () {
    return `${title}, ${pages} pages, ${
      read === true ? 'read' : 'not read yet'
    }`;
  };
}
