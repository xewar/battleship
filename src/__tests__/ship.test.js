import { ship } from '../ship';

test('shipLength', () => {
  expect(ship(3).getLength()).toBe(3);
});

test('hitMap updates with strike position', () => {
  expect(ship(3).hit(2)).toEqual([0, 0, 1]);
});

test('isSunk evaluates to true when sunk', () => {
  let mockHitMap = [1, 1];
  expect(ship(2).isSunk(mockHitMap)).toBe(true);
});
