export const conectaAPI = {
  registrarUsuario,
};

async function registrarUsuario() {
  const conexao = await fetch("http://localhost:3000/cadastros", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: localStorage.getItem("cadastro"),
  }); // O código acima é uma requisição POST que envia os dados do formulário para o servidor.

  //  O código abaixo converte a resposta da requisição em um objeto JavaScript.
  const conexaoConvertida = await conexao.json();

  return conexaoConvertida;
}
