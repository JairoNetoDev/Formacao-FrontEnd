function addDiscountOnBooks(books) {
  const desconto = 0.5;
  discountedBooks = books.map((book) => {
    return { ...book, preco: book.preco - book.preco * desconto };
  });

  return discountedBooks;
}
