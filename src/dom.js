import { game } from './game';
import { gameboard } from './gameboard';

let dom = (() => {
  const { hg, canvasSize } = game;

  let ships = document.querySelector('.ships');
  let hgDiv = document.querySelector('.humanBoard');
  let cgDiv = document.querySelector('.computerBoard');
  //create ships
  let createShip = () => {
    for (let ship in hg.allShips) {
      let shipDiv = document.createElement('div');
      shipDiv.className = `ship horizontal`;
      shipDiv.draggable = true;
      for (let i = 0; i < hg.allShips[ship].getLength(); i++) {
        let cell = document.createElement('div');
        cell.className = 'cell shipCell';
        cell.id = `${ship}${i}`;
        shipDiv.append(cell);
      }
      shipDiv.id = `${ship}`;
      ships.append(shipDiv);
    }
  };
  createShip();

  //create gameboards
  let createDOMGameboard = player => {
    for (let i = 0; i < game.canvasSize; i++) {
      for (let j = 0; j < game.canvasSize; j++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `[${j}, ${i}]`;
        player.append(cell);
      }
    }
  };
  createDOMGameboard(hgDiv);
  createDOMGameboard(cgDiv);

  //attempt to place ships
  let attemptToPlaceShip = (shipId, attemptedCoordinates) => {
    // checks to see if its possible to drop the ship there
    let attempt = hg.placeShip(
      canvasSize,
      hg.board,
      hg.allShips[shipId],
      attemptedCoordinates,
      hg.allShips[shipId].rotation
    );
    return attempt;
  };
  //clears position (for moving ships around on human gameboard)
  let clearPosition = (shipId, oldPosition) => {
    //clears position
    hg.allShips[shipId].position = {};
    for (let cell in oldPosition) {
      //clears board
      hg.board[cell][2] = null;
    }
  };
  //if human ship placement is invalid, move ship back to old position
  let restoreOldPosition = (shipId, oldPosition) => {
    hg.allShips[shipId].position = oldPosition;
    for (let cell in oldPosition) {
      //clears board
      hg.board[cell][2] = 'filled';
    }
  };
  let updatePosition = (attempt, shipId) => {
    hg.board = attempt[1];
    hg.allShips[shipId].position = attempt[0];
  };
  let formattingWorkaround = currentShip => {
    let shipLength = currentShip.children.length;
    if (currentShip.classList.contains('horizontal')) {
      currentShip.classList.add('horizontalPlaced');
      if (window.innerWidth > 750) {
        currentShip.style.gridTemplateColumns = `repeat(${shipLength},42px)`;
      } else {
        currentShip.style.gridTemplateColumns = `repeat(${shipLength},32px)`;
      }
    }
  };

  //change orientation of ship from horizontal to vertical
  let changeOrientation = e => {
    let ship = e.target.parentElement;
    if (ship.classList.contains('horizontal')) {
      hg.allShips[ship.id].rotation = 'vertical'; //changes the ships orientation
      ship.classList.remove('horizontal');
      ship.classList.add('vertical');
      ship.style.gridTemplateColumns = null;
    } else {
      hg.allShips[ship.id].rotation = 'horizontal'; //changes the ships orientation
      ship.classList.add('horizontal');
      ship.classList.remove('vertical');
      let shipLength = hg.allShips[ship.id].getLength();
      if (window.innerWidth > 750) {
        ship.style.gridTemplateColumns = `repeat(${shipLength},42px)`;
      } else {
        ship.style.gridTemplateColumns = `repeat(${shipLength},32px)`;
      }
    }
  };

  let shipsDivs = document.querySelectorAll('.ship');
  let shipsArray = [...shipsDivs];

  let cells = document.querySelectorAll('.humanBoard > .cell');
  return {
    shipsArray,
    cells,
    changeOrientation,
    attemptToPlaceShip,
    clearPosition,
    restoreOldPosition,
    updatePosition,
    formattingWorkaround,
  };
})();

export { dom };
