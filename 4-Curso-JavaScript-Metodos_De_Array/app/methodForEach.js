const elementForInsertBooks = document.getElementById("livros");
const elementTotalValueOfAvailableBooks = document.getElementById(
  "valor_total_livros_disponiveis"
);

function printBooksOnScreen(books) {
  elementForInsertBooks.innerHTML = "";
  elementTotalValueOfAvailableBooks.innerHTML = "";
  books.forEach((book) => {
    let availableBook = isBookAvailable(book);
    elementForInsertBooks.innerHTML += `
        <div class="livro">
        <img class="${availableBook}" src="${book.imagem}" alt="${book.alt}" />
        <h2 class="livro__titulo">
          ${book.titulo}
        </h2>
        <p class="livro__descricao">${book.autor}</p>
        <p class="livro__preco" id="preco">R$${book.preco}</p>
        <div class="tags">
          <span class="tag">${book.categoria}</span>
        </div>
        `;
  });
}

function isBookAvailable(book) {
  let isAvailable =
    book.quantidade > 0 ? "livro__imagens" : "livro__imagens indisponivel";
  return isAvailable;
}
