import ship from './ship.js';

let gameboard = (() => {
  // let allShips = {
  //   carrier: ship(5),
  //   battleship: ship(4),
  //   cruiser: ship(3),
  //   destroyer1: ship(2),
  //   destroyer2: ship(2),
  //   submarine: ship(1),
  // };
  let shipsArray = [];

  //standard gameboard size 10x10
  let canvasSize = 3;
  let board = [];
  for (let i = 0; i < canvasSize; i++) {
    for (let j = 0; j < canvasSize; j++) {
      board.push([j, i, null]);
    }
  }
  let getBoard = () => board;

  //place ships at specific coordinates by calling the ship's factory function
  const placeShip = (canvasSize, board, ship, coordinates, rotation) => {
    //check that the ship can fit
    if (
      rotation === 'horizontal' &&
      coordinates[0] + ship.getLength() > canvasSize
    ) {
      //ship doesn't fit
      return;
    } else if (
      rotation === 'vertical' &&
      coordinates[1] + ship.getLength() > canvasSize
    ) {
      //ship doesn't fit
      return;
    }
    //place ships
    let newBoard = board.map(i => [...i]);
    let shipPosition = {};
    for (let i = 0; i < ship.getLength(); i++) {
      let convertedCoordinates = coordinates;
      if (rotation === 'horizontal') {
        convertedCoordinates = coordinates[0] + i + canvasSize * coordinates[1];
      } else {
        convertedCoordinates =
          coordinates[0] + canvasSize * (coordinates[1] + i);
      }
      if (newBoard[convertedCoordinates][2] === 'filled') {
        //if the square is already full, can't place ship there
        return board;
      }
      shipPosition[convertedCoordinates] = 'filled';
      newBoard[convertedCoordinates][2] = 'filled';
    }
    ship.position = shipPosition;
    shipsArray.push(ship);
    board = newBoard;
    return board;
  };
  let missedAttacks = [];
  let getMissedAttacks = () => missedAttacks;
  let receiveAttack = (coordinates, board) => {
    let convertedCoordinate = coordinates[0] + canvasSize * coordinates[1];
    if (board[convertedCoordinate][2] === 'filled') {
      //then sends the hit function to the correct ship
      shipsArray.forEach(
        ship =>
          function () {
            if (ship['position'][convertedCoordinate] === 'filled') {
              ship.hit(convertedCoordinate);
            }
          }
      );
    } else {
      //or records the coordinates of the missed shot
      missedAttacks.push(convertedCoordinate);
    }
  };

  //track missed attacks (so they can display them properly)

  //report whether or not all the ships have sunk
  return { getBoard, placeShip, getMissedAttacks, shipsArray };
})();

export { gameboard };
