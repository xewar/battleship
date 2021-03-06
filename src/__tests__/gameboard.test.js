import { gameboard } from '../gameBoard';
import { ship } from '../ship';

const { receiveAttack, allShips, shipFits, getMissedAttacks, placeShip } =
  gameboard();

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
  expect(placeShip(3, copyMock, ship(3), [0, 0], 'vertical')[1]).toEqual([
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

test('ship placement would extend beyond the edge of the gameboard', () => {
  expect(shipFits(3, allShips['carrier'], [0, 2], 'vertical')).toEqual(false);
});

test('gameboard space already has a ship on it', () => {
  let copyFilled = filledMock.map(i => [...i]); //deep copy so as not to keep copying + pasting the gameboard array
  expect(placeShip(3, copyFilled, ship(3), [0, 0], 'horizontal')[1]).toEqual(0);
});

test('board updates with multiple ships', () => {
  let copyFilled = filledMock.map(i => [...i]); //deep copy so as not to keep copying + pasting the gameboard array
  expect(
    placeShip(3, copyFilled, allShips['submarine1'], [0, 0], 'vertical')[1]
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

test('ship position updated when hit by an attack', () => {
  let allShipsMock = { carrier: ship(5) };
  allShipsMock['carrier'].position = {
    1: 'filled',
    4: 'filled',
    7: 'filled',
  };
  let copyFilled = filledMock.map(i => [...i]); //deep copy so as not to keep copying + pasting the gameboard array
  receiveAttack([1, 0], copyFilled, allShipsMock, 3);
  expect(allShipsMock['carrier'].position).toEqual({
    1: 'hit',
    4: 'filled',
    7: 'filled',
  });
});

test('if attack misses, missedAttacks updated', () => {
  let allShipsMock = { carrier: ship(5) };
  allShipsMock['carrier'].position = {
    1: 'filled',
    4: 'filled',
    7: 'filled',
  };
  let copyFilled = filledMock.map(i => [...i]); //deep copy so as not to keep copying + pasting the gameboard array
  receiveAttack([0, 0], copyFilled, allShipsMock, 3);
  receiveAttack([2, 1], copyFilled, allShipsMock, 3);
  expect(getMissedAttacks()).toEqual([0, 5]);
});
