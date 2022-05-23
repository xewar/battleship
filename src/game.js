import { gameboard } from './gameboard.js';
import { player } from './player.js';
import { placeComputerShips } from './placeComputerShips.js';
let game = (() => {
  let canvasSize = 10; //standard size is 10x10
  let hg = gameboard(); //human player gameboard
  hg.createBoard(canvasSize);
  let cg = gameboard(); //computer gameboard
  cg.createBoard(canvasSize); //draw a board
  placeComputerShips(cg, canvasSize); //place computer ships randomly
  let human = player(0);
  let computer = player(1);

  return { cg, hg, canvasSize, human, computer };
})();

export { game };
