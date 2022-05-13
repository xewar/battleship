import { gameboard } from './gameboard.js';
import { ship } from './ship.js';
import { player } from './player.js';

// The game loop should set up a new game by creating Players and Gameboards.
// For now just populate each Gameboard with predetermined coordinates.
// You can implement a system for allowing players to place their ships later.
const { computerCoordinate } = player;
let game = (() => {
  //   let human = player(1);
  //   let computer = player(2);
  let canvasSize = 10;

  //create computer gameboard
  let cg = gameboard; //computer gameboard
  cg.createBoard(canvasSize); //draw a board
  let randomCoordinate = () => Math.round(Math.random() * 9, 0);
  let randomRotation = () => {
    let random = Math.round(Math.random() * 1, 0);
    if (random === 1) {
      return 'vertical';
    } else {
      return 'horizontal';
    }
  };
  let coordinate1;
  let coordinate2;

  let shipPlacement = ship => {
    let rotation = randomRotation();
    coordinate1 = randomCoordinate();
    coordinate2 = randomCoordinate();
    return cg.placeShip(
      canvasSize,
      cg.board,
      cg.allShips[ship],
      [coordinate1, coordinate2],
      rotation
    );
  };
  let placeComputerShips = () => {
    let attempt;
    let result;
    for (const ship in cg.allShips) {
      let tryPlacement = () => {
        attempt = shipPlacement(ship);
        if (attempt[0] === 0) {
          tryPlacement();
        } else {
          return attempt;
        }
        return attempt;
      };
      result = tryPlacement(); //saves a successful placement
      cg.allShips[ship].position = attempt[0]; //updates ship
      cg.board = attempt[1]; //updates  board
    }
  };

  //place ship for human gameboard
  //players take turn attacking
  // player enters coordinates, computer picks them automatically
  return { placeComputerShips, cg };
})();

export { game };
