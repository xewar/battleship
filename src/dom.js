import { game } from './game';
import { gameboard } from './gameboard';

let dom = (() => {
  let ships = document.querySelector('.ships');
  let hgDiv = document.querySelector('.humanBoard');
  let cgDiv = document.querySelector('.computerBoard');

  //create ships
  let createShip = () => {
    for (let ship in gameboard.allShips) {
      let shipDiv = document.createElement('div');
      shipDiv.className = `${ship} ship`;
      console.log(shipDiv);
      for (let i = 0; i < gameboard.allShips[ship].getLength(); i++) {
        let cell = document.createElement('div');
        cell.className = 'cell shipCell';
        cell.id = `${ship}, i`;
        shipDiv.append(cell);
      }
      ships.append(shipDiv);
    }
  };
  createShip();
  //create gameboards

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
