import { dom } from './dom.js';

const eventHandler = (() => {
  const { shipsArray, cells } = dom;
  const clickHandler = () => {
    //rotating ships
    let changeOrientation = e => {
      e.target.classList.add('vertical');
    };
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
      e.target.classList.remove('drag-over');
      // get the draggable element
      const id = e.dataTransfer.getData('text/plain');
      const currentShip = document.getElementById(id);
      currentShip.classList.add('placedShip');

      // add it to the drop target
      e.target.appendChild(currentShip);

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
