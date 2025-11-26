// verifica se a senha contém um número
function checkNumber(pass) {
  if (typeof pass === 'string') {
    let regex = /\d/;
    return regex.test(pass);
  }
}

// verifica se a senha contém um caractere especial
function checkSymbol(pass) {
  if (typeof pass === 'string') {
    let regex = /[!@#$%^&*(),.?":{}|<>_]/;
    return regex.test(pass);
  }
}

// executa ambas as verificações
function checkPass(pass) {
  return checkNumber(pass) && checkSymbol(pass);
}

// exporta as funções para poder testá-las
module.exports = { checkNumber, checkSymbol, checkPass };
