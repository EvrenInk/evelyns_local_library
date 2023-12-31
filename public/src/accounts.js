function findAccountById(accounts, id) {
  return accounts.find(item => item.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((lastA, lastB) => 
  lastA.name.last.toLowerCase() > lastB.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) { //RELEARNED REDUCE() AND I KINDA GET IT NOW!
  return books.reduce((total, book) => {
    const borrows = book.borrows;
    const borrowCount = borrows.filter((borrow) => borrow.id === account.id).length; //i honestly didn't even know that i never used filter
    return total + borrowCount;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  let checkedOut = [];
  const idToMatch = account.id;
  let authorToMatch = {}
  books.forEach(book => { 
    authors.forEach(authorIndex => {
      if (book.authorId === authorIndex.id) authorToMatch = authorIndex;
    })
    const borrows = book.borrows;
    borrows.forEach(borrow => {
      if (borrow.id === idToMatch && borrow.returned === false) {
        book.author = authorToMatch;
        checkedOut.push(book);
      }
    })
  })
  return checkedOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
