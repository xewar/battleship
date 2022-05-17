import { game } from './game';

let dom = (() => {
  let header = document.querySelector('.header');
  console.log(header.textContent);
  let hgDiv = document.querySelector('.humanBoard');
  let cgDiv = document.querySelector('.computerBoard');
  //create human gameboard
  let createGameboard = player => {
    for (let i = 0; i < game.canvasSize; i++) {
      for (let j = 0; j < game.canvasSize; j++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `[${i}, ${j}]`;
        player.append(cell);
      }
    }
  };
  createGameboard(hgDiv);
  createGameboard(cgDiv);
})();

export default dom;
