import { ship } from '../ship';

test('shipLength', () => {
  expect(ship(3).getLength()).toBe(3);
});

test('isSunk evaluates to true when sunk', () => {
  let mockPosition = { 2: 'hit', 3: 'filled' };
  expect(ship(2).shipIsSunk(mockPosition)).toBe(false);
});
