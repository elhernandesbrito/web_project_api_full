const { checkNumber, checkSymbol, checkPass } = require('./function');

test('Verifica se a senha contém um número', () => {
  expect(checkNumber('some_not_so_strong_pass')).toBe(false);
  expect(checkNumber('stronger_pass_123')).toBe(true);
});

test('Verifica se a senha contém um caractere especial', () => {
  expect(checkSymbol('somePass')).toBe(false);
  expect(checkSymbol('another_pass')).toBe(true);
});

test('Verifica a senha', () => {
  expect(checkPass('somePas$')).toBe(false);
  expect(checkPass('another_pass_123')).toBe(true);
});
