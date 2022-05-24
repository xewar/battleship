import { game } from './game';
import { gameboard } from './gameboard';

let dom = (() => {
  const { hg, cg, canvasSize, human, computer } = game;
  let shipContainer = document.querySelector('.shipContainer');
  let ships = document.querySelector('.ships');
  let hgDiv = document.querySelector('.humanBoard');
  let cgDiv = document.querySelector('.computerBoard');
  let instructions = document.querySelector('.instructions');
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
  let attemptToPlaceShip = (shipId, attemptedCoordinates, rotation) => {
    // checks to see if its possible to drop the ship there
    let attempt = hg.placeShip(
      canvasSize,
      hg.board,
      hg.allShips[shipId],
      attemptedCoordinates,
      rotation
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
  let allShipsPlaced = () => {
    if (ships.childNodes.length === 0) {
      instructions.innerHTML = `Select a target on your opponent's board to begin the game.`;
      // +'<br />' +
      // `The ships are also shown above.`;
      return true;
    }
  };

  let shipsDivs = document.querySelectorAll('.ship');
  let shipsArray = [...shipsDivs];

  let cells = document.querySelectorAll('.humanBoard > .cell');
  let computerCells = document.querySelectorAll('.computerBoard > .cell ');

  let humanCount = 0;
  let computerCount = 0;
  let renderAttack = (attackDiv, attackCoordinates, player) => {
    let hitShip;
    if (player === 'human') {
      //added to guesses, and opposing players gameboard
      human.guesses.push(attackCoordinates);
      humanCount += 1;
      hitShip = cg.receiveAttack(
        attackCoordinates,
        cg.board,
        cg.allShips,
        canvasSize
      );
    } else {
      computer.guesses.push(attackCoordinates);
      computerCount += 1;
      hitShip = hg.receiveAttack(
        attackCoordinates,
        hg.board,
        hg.allShips,
        canvasSize
      );
      console.log('computerCount', computerCount, 'humanCount', humanCount);
    }
    //graphically represented in the DOM
    if (hitShip === true) {
      attackDiv.classList.add('hit');
      if (player === 'computer') {
        attackDiv.classList.add('computerHit');
      }
    } else {
      attackDiv.classList.add('missed');
    }
    if (cg.allSunk(cg.allShips) || hg.allSunk(hg.allShips)) {
      gameOver();
    }
    switchPlayer(player);
  };
  let switchPlayer = player => {
    if (player === 'human') {
      player = 'computer';
      let guess = computerGuess();
      let convertedGuess = guess[0] + canvasSize * guess[1];
      let guessDiv = document.querySelector(
        `.humanBoard :nth-child(${convertedGuess + 1})`
      );
      renderAttack(guessDiv, guess, 'computer');
    } else {
      player = 'human';
    }
  };
  let computerGuess = () => {
    let randomCoordinate = () => Math.round(Math.random() * 9, 0); //random coordinates
    let guess = [randomCoordinate(), randomCoordinate()];
    if (computer.guesses.includes(guess)) {
      console.log('trying again');
      computerGuess();
    } else {
      return guess;
    }
  };

  let gameOver = () => {
    if (cg.allSunk(cg.allShips)) {
      instructions.textContent = 'Congratulations!';
    } else {
      instructions.textContent = "Sorry. You've lost.";
    }
  };

  return {
    shipsArray,
    cells,
    computerCells,
    changeOrientation,
    attemptToPlaceShip,
    clearPosition,
    restoreOldPosition,
    updatePosition,
    formattingWorkaround,
    allShipsPlaced,
    renderAttack,
  };
})();

export { dom };
