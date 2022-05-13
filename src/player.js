import { gameboard } from './gameboard.js';
import { ship } from './ship.js';

let player = turn => {
  let guesses = [];
  let sayHello = () => console.log('hi');
  return { guesses, turn, sayHello };
};

export { player };
