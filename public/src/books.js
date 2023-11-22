function findAuthorById(authors, id) {
  let authorFound = authors.find((author) => author.id === id)
  return authorFound;
}

function findBookById(books, id) {
  let bookFound = books.find((book) => book.id === id);
  return bookFound;
}

function partitionBooksByBorrowedStatus(books) {
  let checkedOut = [];
  let availableBooks = [];
  books.forEach(book => {
    const borrows = book.borrows;
    const isBookCheckedOut = borrows.some(borrow => !borrow.returned);
    if (isBookCheckedOut) checkedOut.push(book);
    else {availableBooks.push(book)};
  });
  const allBooks = [checkedOut,availableBooks];
  return allBooks;
}

function getBorrowersForBook(book, accounts) {
  let bookBorrowers = [];
  const borrows = book.borrows;
  borrows.forEach(borrow => {
    const idToMatch = borrow.id;
    let foundAccount = accounts.find((account) => account.id === idToMatch);
    foundAccount.returned = borrow.returned;
    if (bookBorrowers.length === 10) return bookBorrowers;
    else {bookBorrowers.push(foundAccount)};
  });
  return bookBorrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
