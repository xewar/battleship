import { gameboard } from './gameboard.js';
import { ship } from './ship.js';
import { player } from './player.js';
import { placeComputerShips } from './placeComputerShips.js';
// The game loop should set up a new game by creating Players and Gameboards.
// For now just populate each Gameboard with predetermined coordinates.
// You can implement a system for allowing players to place their ships later.

let game = () => {
  let canvasSize = 10; //standard size is 10x10
  let cg = gameboard; //computer gameboard
  cg.createBoard(canvasSize); //draw a board
  placeComputerShips(cg, canvasSize); //place computer ships randomly
  console.log(cg.board);
  //call placeship functions for each player
  //players take turn attacking
  // player enters coordinates, computer picks them automatically
  return { cg };
};

export { game };
