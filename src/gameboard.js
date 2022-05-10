import ship from './ship.js';

let gameboard = (() => {
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
  const placeShip = (board, ship, coordinates, rotation) => {
    let newBoard = board.map(i => [...i]);

    //check that the ship can fit
    if (rotation === 'horizontal') {
      if (coordinates[0] + ship.getLength() > canvasSize) {
        //ship doesn't fit
        return board;
      }
    } else if (rotation === 'vertical') {
      if (coordinates[1] + ship.getLength() > canvasSize) {
        //ship doesn't fit
        return board;
      }
    }

    //place ships
    for (let i = 0; i < ship.getLength(); i++) {
      let convertedCoordinates = coordinates;
      if (rotation === 'horizontal') {
        convertedCoordinates = canvasSize * coordinates[0] + coordinates[1] + i;
      } else {
        convertedCoordinates =
          coordinates[0] + canvasSize * (coordinates[1] + i);
      }
      if (newBoard[convertedCoordinates][2] === 'filled') {
        //if the square is already full, can't place ship there
        console.log('square is full');
        return board;
      }
      newBoard[convertedCoordinates][2] = 'filled';
    }
    board = newBoard;
    console.log('new board = new board has executed');
    return board;
  };

  //receiveAttack - takes coordinates and then determine whether or not the attack hit a ship
  //then sends the hit function to the correct ship
  //or records the coordinates of the missed shot

  //track missed attacks (so they can display them properly)

  //report whether or not all the ships have sunk
  return { getBoard, placeShip };
})();

export { gameboard };
