function calculateTotalValueOfBooks(books) {
  let valueTotalOfBooks = books
    .reduce((total, book) => total + book.preco, 0)
    .toFixed(2);
  return valueTotalOfBooks;
}
