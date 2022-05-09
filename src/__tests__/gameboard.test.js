import { gameboard } from '../gameBoard';
import { ship } from '../ship';
test('place ships at specific coordinates', () => {
  //mock 3x3 gameboard
  let mockGameboard = [
    [0, 0, null],
    [0, 1, null],
    [0, 2, null],
    [1, 0, null],
    [1, 1, null],
    [1, 2, null],
    [2, 0, null],
    [2, 1, null],
    [2, 2, null],
  ];
  expect(gameboard.placeShip(ship(3), [0, 0], 'horizontal')).toEqual([
    [0, 0, 'filled'],
    [0, 1, 'filled'],
    [0, 2, 'filled'],
    [1, 0, null],
    [1, 1, null],
    [1, 2, null],
    [2, 0, null],
    [2, 1, null],
    [2, 2, null],
  ]);
});
