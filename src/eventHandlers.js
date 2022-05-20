import { dom } from './dom.js';
import { gameboard } from './gameboard.js';
import { placeComputerShips } from './placeComputerShips.js';
import { game } from './game.js';
import { ship } from './ship.js';
import { player } from './player.js';

const eventHandler = (() => {
  const {
    shipsArray,
    cells,
    attemptToPlaceShip,
    changeOrientation,
    clearPosition,
    restoreOldPosition,
    updatePosition,
    formattingWorkaround,
  } = dom;
  const { hg, canvasSize } = game;

  const clickHandler = () => {
    //Dragging and dropping player ships
    let dragStart = e => {
      //grab the id of the ship that's being dragged
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
      }, 1500);
    };
    let drop = e => {
      //get the coordinates of the proposed drop location
      const shipId = e.dataTransfer.getData('text/plain');
      const currentShip = document.getElementById(shipId);
      let coordinateString;
      if (e.target.classList.contains('shipCell')) {
        //if you are moving a ship on top of where it currently sits,
        //you have to grab the coordinates from the underlying cells
        coordinateString = e.target.parentElement.parentElement.id;
      } else {
        coordinateString = e.target.id;
      }
      let oldPosition = hg.allShips[shipId].position;
      let attemptedCoordinates = [+coordinateString[1], +coordinateString[4]];
      clearPosition(shipId, oldPosition);
      let attempt = attemptToPlaceShip(shipId, attemptedCoordinates);
      if (attempt[0] == 0) {
        //attempt is invalid
        currentShip.classList.remove('hide');
        e.target.classList.remove('drag-over');
        //reinstate position
        restoreOldPosition(shipId, oldPosition);
        return;
      } else {
        //attempt is valid
        updatePosition(attempt, shipId);
        e.target.classList.remove('drag-over');
        let placeShipDOM = currentShip => {
          currentShip.classList.add('placedShip');
          currentShip.classList.remove('hide');
          //if there is overlap, add to the underlying cell
          if (e.target.classList.contains('shipCell')) {
            e.target.parentElement.parentElement.append(currentShip);
          } else {
            e.target.append(currentShip);
          }
          if (e.target.classList.contains('shipCell')) {
            e.target.parentElement.parentElement.append(currentShip);
          } else {
            e.target.append(currentShip);
          }
        };
        placeShipDOM(currentShip);
      }
      //workaround for a formatting issue (cells collapsing in horizontal placement)
      formattingWorkaround(currentShip);
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
