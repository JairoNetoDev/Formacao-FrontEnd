export default function isLegalAge(campo) {
  const birthDate = new Date(campo.value);
  if (!validaIdade(birthDate)) {
    campo.setCustomValidity(
      "Você deve ser maior que 18 anos para se cadastrar."
    );
  }
}

function validaIdade(date) {
  const actualDate = new Date();
  const dateLegalAge = new Date(
    date.getUTCFullYear() + 18,
    date.getUTCMonth(),
    date.getUTCDate()
  );
  console.log(dateLegalAge);

  return actualDate >= dateLegalAge;
}
