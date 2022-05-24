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
  let human = player();
  let computer = player();

  let updateGameboard = (player, attackCoordinates) => {
    if (player === 'human') {
      //added to guesses, and opposing players gameboard
      human.guesses.push(attackCoordinates);
      return cg.receiveAttack(
        attackCoordinates,
        cg.board,
        cg.allShips,
        canvasSize
      );
    } else {
      computer.guesses.push(attackCoordinates);
      return hg.receiveAttack(
        attackCoordinates,
        hg.board,
        hg.allShips,
        canvasSize
      );
    }
  };
  return { cg, hg, canvasSize, human, computer, updateGameboard };
})();

export { game };
