const { multiply, substract } = require('./math');

test('multiply multiplies numbers', () => {
  const result = multiply(3, 7);
  const expected = 21;

  expect(result).toBe(expected);
});

test('subtract subtracts numbers', () => {
  const result = substract(7, 3);
  const expected = 4;

  expect(result).toBe(expected);
});
