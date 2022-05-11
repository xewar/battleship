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
let filledMock = [
  [0, 0, null],
  [1, 0, 'filled'],
  [2, 0, null],
  [0, 1, 'filled'],
  [1, 1, 'filled'],
  [2, 1, null],
  [0, 2, null],
  [1, 2, 'filled'],
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

test('ship placement would extend beyond the edge of the gameboard', () => {
  expect(
    gameboard.shipFits(3, gameboard.allShips['carrier'], [0, 2], 'vertical')
  ).toEqual(false);
});

test('gameboard space already has a ship on it', () => {
  let copyFilled = filledMock.map(i => [...i]); //deep copy so as not to keep copying + pasting the gameboard array
  expect(
    gameboard.placeShip(3, copyFilled, ship(3), [0, 0], 'horizontal')
  ).toEqual();
});

test('board updates with multiple ships', () => {
  let copyFilled = filledMock.map(i => [...i]); //deep copy so as not to keep copying + pasting the gameboard array
  expect(
    gameboard.placeShip(
      3,
      copyFilled,
      gameboard.allShips['submarine1'],
      [0, 0],
      'vertical'
    )
  ).toEqual([
    [0, 0, 'filled'],
    [1, 0, 'filled'],
    [2, 0, null],
    [0, 1, 'filled'],
    [1, 1, 'filled'],
    [2, 1, null],
    [0, 2, null],
    [1, 2, 'filled'],
    [2, 2, null],
  ]);
});

test('if attack misses, missedAttacks updated', () => {
  let allShipsMock = { carrier: ship(5) };
  allShipsMock['carrier'].position = {
    1: 'filled',
    4: 'filled',
    7: 'filled',
  };
  let copyFilled = filledMock.map(i => [...i]); //deep copy so as not to keep copying + pasting the gameboard array
  gameboard.receiveAttack([1, 0], copyFilled, allShipsMock);
  expect(allShipsMock['carrier'].position).toEqual({
    1: 'hit',
    4: 'filled',
    7: 'filled',
  });
});

test.only('ship hit in receiveAttack', () => {
  let allShipsMock = { carrier: ship(5) };
  allShipsMock['carrier'].position = {
    1: 'filled',
    4: 'filled',
    7: 'filled',
  };
  let copyFilled = filledMock.map(i => [...i]); //deep copy so as not to keep copying + pasting the gameboard array
  gameboard.receiveAttack([0, 0], copyFilled, allShipsMock);
  gameboard.receiveAttack([2, 1], copyFilled, allShipsMock);
  expect(gameboard.getMissedAttacks()).toEqual([0, 5]);
});
