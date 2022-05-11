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
test('place ship vertically', () => {
  let copyMock = mockGameboard.map(i => [...i]); //deep copy so as not to keep copying + pasting the gameboard array
  expect(gameboard.placeShip(3, copyMock, ship(3), [0, 0], 'vertical')).toEqual(
    [
      [0, 0, 'filled'],
      [1, 0, null],
      [2, 0, null],
      [0, 1, 'filled'],
      [1, 1, null],
      [2, 1, null],
      [0, 2, 'filled'],
      [1, 2, null],
      [2, 2, null],
    ]
  );
});

test("ship doesn't fit", () => {
  let copyMock = mockGameboard.map(i => [...i]);
  expect(
    gameboard.placeShip(3, copyMock, ship(3), [0, 2], 'vertical')
  ).toEqual();
});

test('gameboard space already has a ship on it', () => {
  let filledMock = [
    [0, 0, null],
    [1, 0, null],
    [2, 0, 'filled'],
    [0, 1, null],
    [1, 1, null],
    [2, 1, null],
    [0, 2, null],
    [1, 2, null],
    [2, 2, null],
  ];
  expect(
    gameboard.placeShip(3, filledMock, ship(3), [0, 0], 'horizontal')
  ).toEqual([
    [0, 0, null],
    [1, 0, null],
    [2, 0, 'filled'],
    [0, 1, null],
    [1, 1, null],
    [2, 1, null],
    [0, 2, null],
    [1, 2, null],
    [2, 2, null],
  ]);
});
