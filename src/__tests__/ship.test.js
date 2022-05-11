import { ship } from '../ship';

test('shipLength', () => {
  expect(ship(3).getLength()).toBe(3);
});

test('hitMap updates with strike position', () => {
  expect(ship(3).hit(2)).toEqual({ 2: 'hit' });
});

test.only('isSunk evaluates to true when sunk', () => {
  let mockPosition = { 2: 'hit', 3: 'filled' };
  expect(ship(2).isSunk(mockPosition)).toBe(false);
});
