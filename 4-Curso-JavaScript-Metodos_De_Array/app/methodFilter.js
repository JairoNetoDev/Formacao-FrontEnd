const filterButtons = document.querySelectorAll(".btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", filterBooks);
});

function filterBooks() {
  console.log(this.id);
  const elementBt = document.getElementById(this.id);
  const categoria = elementBt.value;
  let filteredBooks =
    categoria == "disponivel"
      ? filterByAvailable()
      : filterByCategoria(categoria);
  printBooksOnScreen(filteredBooks);

  if (categoria == "disponivel") {
    let totalValue = calculateTotalValueOfBooks(filteredBooks);
    printTotalValueOfBooksOnScreen(totalValue);
  }
}

function printTotalValueOfBooksOnScreen(totalValue) {
  elementTotalValueOfAvailableBooks.innerHTML = `
      <div class="livros__disponiveis">
        <p>Todos os livros disponíveis por R$ <span id="valor">${totalValue}</span></p>
      </div>
  `;
}

function filterByCategoria(categoria) {
  return books.filter((book) => book.categoria == categoria);
}

function filterByAvailable() {
  return books.filter((book) => book.quantidade > 0);
}
