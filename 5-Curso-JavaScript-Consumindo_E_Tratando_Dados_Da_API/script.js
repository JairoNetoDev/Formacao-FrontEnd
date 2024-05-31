(() => {
  async function buscarEndereco(cep) {
    const mensagemErro = document.getElementById("mensagemErro");
    mensagemErro.innerHTML = "";
    try {
      const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const response = await request.json();

      if (response.erro) {
        throw new Error(`CEP: ${cep} não encontrado`);
      }

      const cidade = document.getElementById("cidade");
      const logradouro = document.getElementById("endereco");
      const estado = document.getElementById("estado");
      const bairro = document.getElementById("bairro");
      const complemento = document.getElementById("complemento");

      cidade.value = response.localidade;
      logradouro.value = response.logradouro;
      estado.value = response.uf;
      bairro.value = response.bairro;
      complemento.value = response.complemento;

      console.log(response);

      return response;
    } catch (err) {
      if (cep.length != 8) {
        mensagemErro.innerHTML = `<p>CEP: ${cep} não encontrado. Insira um CEP de 8 dígitos.</p>`;
      }
      console.error(err);
    }
  }

  const cep = document.getElementById("cep");
  cep.addEventListener("focusout", () => buscarEndereco(cep.value));
})();
