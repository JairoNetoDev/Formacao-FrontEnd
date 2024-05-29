let books = [];
const endpointAPI =
  "https://guilhermeonrails.github.io/casadocodigo/livros.json";
getSearchBooks();

async function getSearchBooks() {
  const response = await fetch(endpointAPI);
  books = await response.json();
  let discountedBooks = addDiscountOnBooks(books);
  printBooksOnScreen(discountedBooks);
}
