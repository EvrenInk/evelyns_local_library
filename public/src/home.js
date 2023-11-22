function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowedBooks = 0;
  books.forEach((book) => {
    const borrows = book.borrows;
    borrows.forEach((borrow) => {
      if (borrow.returned === false) borrowedBooks += 1;
    });
  });
  return borrowedBooks;
}

function arraySortFive(array) {
  let result = array.sort((a,b) => b.count - a.count);
  return result.slice(0,5);
}

function getMostCommonGenres(books) {
  const genreCount = {};
  for (const book of books) {
    if (book.genre) {
      genreCount[book.genre] = (genreCount[book.genre] || 0) +1;
    }
  }
  const genreArray = Object.keys(genreCount).map((genre) => ({
    name: genre,
    count: genreCount[genre],
  }))
  return arraySortFive(genreArray);
}

function getMostPopularBooks(books) {
  const bookBorrows = {};
  for (const book of books) {
    const borrowCount = book.borrows.length;
    bookBorrows[book.title] = borrowCount;
  }
  const bookArray = Object.keys(bookBorrows).map((title) => ({
    name: title,
    count: bookBorrows[title],
  }));
  return arraySortFive(bookArray);
}

function getMostPopularAuthors(books, authors) {
  const authorBorrows = {};
  for (const book of books) {
    const authorId = book.authorId;
    const author = authors.find((author) => author.id === authorId)
    if (author) {
      const authorName = `${author.name.first} ${author.name.last}`;
      const borrowCount = book.borrows.length;
      if (authorBorrows[authorName]) {
        authorBorrows[authorName] += borrowCount;
      }
      else authorBorrows[authorName] = borrowCount;
    }
  }
  const authorArray = Object.keys(authorBorrows).map((name) => ({
    name: name,
    count: authorBorrows[name],
  }));
  return arraySortFive(authorArray);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
