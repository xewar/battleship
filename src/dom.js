import { game } from './game';
import { gameboard } from './gameboard';

let dom = (() => {
  const { hg } = game;

  let ships = document.querySelector('.ships');
  let hgDiv = document.querySelector('.humanBoard');
  let cgDiv = document.querySelector('.computerBoard');
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
        cell.id = `[${i}, ${j}]`;
        player.append(cell);
      }
    }
  };
  createDOMGameboard(hgDiv);
  createDOMGameboard(cgDiv);

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
      ship.style.gridTemplateColumns = `repeat(${ship.children.length},42px)`;
    }
  };

  let shipsDivs = document.querySelectorAll('.ship');
  let shipsArray = [...shipsDivs];

  let cells = document.querySelectorAll('.humanBoard > .cell');
  return { shipsArray, cells, changeOrientation };
})();

export { dom };
