import './style.css';
import { gameboard } from './gameboard.js';
import { ship } from './ship.js';
import { game } from './game.js';
import { player } from './player.js';

game();

// let count = game.cg.board
//   .reduce((total, amount) => total.concat(amount))
//   .reduce((count, val) => {
//     if (val === 'filled') {
//       count++;
//     }
//     return count;
//   });
// console.log(count);
