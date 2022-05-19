import { dom } from './dom.js';
import { gameboard } from './gameboard.js';
import { placeComputerShips } from './placeComputerShips.js';
import { game } from './game.js';
import { ship } from './ship.js';

const eventHandler = (() => {
  const { shipsArray, cells, changeOrientation } = dom;
  const { hg, canvasSize } = game;

  const clickHandler = () => {
    //Dragging and dropping player ships
    let dragStart = e => {
      e.dataTransfer.setData('text/plain', e.target.id);
      setTimeout(() => {
        e.target.classList.add('hide');
      }, 0);
    };
    let dragEnter = e => {
      e.preventDefault();
      e.target.classList.add('drag-over');
    };
    let dragOver = e => {
      e.preventDefault();
      e.target.classList.add('drag-over');
    };
    let dragLeave = e => {
      setTimeout(() => {
        //delay to add some visual interest
        e.target.classList.remove('drag-over');
      }, 1000);
    };
    let drop = e => {
      const id = e.dataTransfer.getData('text/plain');
      const currentShip = document.getElementById(id);

      //checks to see if its possible to drop the ship there
      // let attempt = hg.placeShip(
      //   canvasSize,ship
      // )
      // console.log('rotation is', hg.allShips[id].rotation);
      // console.log(canvasSize);
      // console.log(e.target);

      // placeComputerShips(hg, canvasSize);
      // e.target.classList.remove('drag-over');

      // get the draggable element
      currentShip.classList.add('placedShip');

      //workaround for a formatting issue (cells collapsing in horizontal placement)
      let shipLength = currentShip.children.length;
      if (currentShip.classList.contains('horizontal')) {
        currentShip.classList.add('horizontalPlaced');
        currentShip.style.gridTemplateColumns = `repeat(${shipLength},42px)`;
      }
      e.target.append(currentShip);

      // display the draggable element
      currentShip.classList.remove('hide');
    };
    cells.forEach(cell => {
      cell.addEventListener('dragenter', dragEnter);
      cell.addEventListener('dragover', dragOver);
      cell.addEventListener('dragleave', dragLeave);
      cell.addEventListener('drop', drop);
    });
    shipsArray.forEach(ship => {
      ship.addEventListener('dragstart', dragStart);
      ship.addEventListener('dblclick', changeOrientation);
    });
  };
  const hoverHandler = () => {};

  return { clickHandler, hoverHandler };
})();

export { eventHandler };
