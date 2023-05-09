export function Book({ title, author, pages, read }) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${title}, ${pages} pages, ${
      read === true ? 'read' : 'not read yet'
    }`;
  };
}
