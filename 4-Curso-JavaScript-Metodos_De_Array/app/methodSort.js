const sortButtonByPrice = document.getElementById("btnOrdenarPorPreco");

sortButtonByPrice.addEventListener("click", sortBooksByPrice);

function sortBooksByPrice() {
  let sortedBooks = books.sort((a, b) => a.preco - b.preco);
  printBooksOnScreen(sortedBooks);
}
