import { game } from './game';
import { gameboard } from './gameboard';

let dom = (() => {
  const { hg } = game;

  let ships = document.querySelector('.ships');
  let hgDiv = document.querySelector('.humanBoard');
  let cgDiv = document.querySelector('.computerBoard');
  //create ships
  let createShip = () => {
    for (let ship in gameboard.allShips) {
      let shipDiv = document.createElement('div');
      shipDiv.className = `ship horizontal`;
      shipDiv.draggable = true;
      for (let i = 0; i < gameboard.allShips[ship].getLength(); i++) {
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

  //change orientation of ship from horizontal to vertical

  let rotation = 'horizontal';

  let changeOrientation = e => {
    let ship = e.target.parentElement;
    if (ship.classList.contains('horizontal')) {
      ship.classList.remove('horizontal');
      ship.style.gridTemplateColumns = null;
      ship.classList.add('vertical');
      rotation = ' vertical';
    } else {
      rotation = 'horizontal';
      ship.classList.add('horizontal');
      ship.classList.remove('vertical');
      ship.style.gridTemplateColumns = `repeat(${ship.children.length},42px)`;
    }
  };

  let shipsDivs = document.querySelectorAll('.ship');
  let shipsArray = [...shipsDivs];

  let cells = document.querySelectorAll('.humanBoard > .cell');
  return { shipsArray, cells, changeOrientation };
})();

export { dom };
