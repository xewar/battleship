import { ship } from './ship.js';

let gameboard = () => {
  const allShips = {
    carrier: ship(5),
    battleship: ship(4),
    cruiser: ship(3),
    destroyer1: ship(2),
    destroyer2: ship(2),
    submarine1: ship(1),
    submarine2: ship(1),
  };
  //create gameboard, standard size is  10x10
  let board = [];
  let createBoard = canvasSize => {
    for (let i = 0; i < canvasSize; i++) {
      for (let j = 0; j < canvasSize; j++) {
        board.push([j, i, null]);
      }
    }
    return board;
  };

  //checks if ship fits on gameboard as its placed initially
  const shipFits = (canvasSize, ship, coordinates, rotation) => {
    if (
      rotation === 'horizontal' &&
      coordinates[0] + ship.getLength() > canvasSize
    ) {
      //ship doesn't fit
      return false;
    } else if (
      rotation === 'vertical' &&
      coordinates[1] + ship.getLength() > canvasSize
    ) {
      //ship doesn't fit
      return false;
    }
    return true;
  };

  //place ships at specific coordinates by calling the ship's factory function
  const placeShip = (canvasSize, board, ship, coordinates, rotation) => {
    //checks to see if the ship goes over the edge of the gameboard
    let shipPosition = {};
    let returnValue = [0, 0];
    if (!shipFits(canvasSize, ship, coordinates, rotation)) {
      return returnValue;
    }
    //place ships
    let newBoard = board.map(i => [...i]);
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
        return returnValue;
      }
      shipPosition[convertedCoordinates] = 'filled';
      newBoard[convertedCoordinates][2] = 'filled';
    }
    returnValue[0] = shipPosition;
    returnValue[1] = newBoard;
    return returnValue;
  };
  let missedAttacks = [];
  let getMissedAttacks = () => missedAttacks;

  //game logic for when an attack comes in
  let receiveAttack = (coordinates, board, allShips, canvasSize) => {
    let convertedCoordinate = coordinates[0] + canvasSize * coordinates[1];
    if (board[convertedCoordinate][2] === 'filled') {
      board[convertedCoordinate][2] === 'hit';
      //then sends the hit function to the correct ship
      for (const ship in allShips) {
        if (allShips[ship].position[convertedCoordinate] === 'filled') {
          allShips[ship].hit(convertedCoordinate, allShips[ship].position);
        }
      }
      return true;
    } else {
      board[convertedCoordinate][2] = 'missed';
      //or records the coordinates of the missed shot
      missedAttacks.push(convertedCoordinate);
      return false;
    }
  };

  //report whether or not all the ships have sunk
  //returns true if they are all sunk, otherwise returns false
  let allSunk = allShips => {
    for (const ship in allShips) {
      //check if any ships are not sunk
      //if any return true, then not all are sunk. otherwise, return false
      if (!allShips[ship].shipIsSunk(allShips[ship].position)) {
        return false;
      }
    }
    return true;
  };
  return {
    allSunk,
    createBoard,
    board,
    placeShip,
    getMissedAttacks,
    shipFits,
    allShips,
    receiveAttack,
  };
};

export { gameboard };
