import { gameboard } from '../gameBoard';
import { ship } from '../ship';
let mockGameboard = [
  [0, 0, null],
  [1, 0, null],
  [2, 0, null],
  [0, 1, null],
  [1, 1, null],
  [2, 1, null],
  [0, 2, null],
  [1, 2, null],
  [2, 2, null],
];
test.only('place ship horiztonally', () => {
  expect(
    gameboard.placeShip(mockGameboard, ship(3), [0, 0], 'vertical')
  ).toEqual([
    [0, 0, 'filled'],
    [1, 0, null],
    [2, 0, null],
    [0, 1, 'filled'],
    [1, 1, null],
    [2, 1, null],
    [0, 2, 'filled'],
    [1, 2, null],
    [2, 2, null],
  ]);
});
