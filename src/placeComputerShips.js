import { ship } from './ship';

let placeComputerShips = (cg, canvasSize) => {
  let randomCoordinate = () => Math.round(Math.random() * 9, 0); //random coordinates
  let randomRotation = () => {
    let random = Math.round(Math.random() * 1, 0);
    if (random === 1) {
      return 'vertical';
    } else {
      return 'horizontal';
    }
  };
  let shipPlacement = ship => {
    let rotation = randomRotation();
    let coordinate1 = randomCoordinate();
    let coordinate2 = randomCoordinate();
    return cg.placeShip(
      canvasSize,
      cg.board,
      cg.allShips[ship],
      [coordinate1, coordinate2],
      rotation
    );
  };

  let attempt;
  let result;
  for (const ship in cg.allShips) {
    let tryPlacement = () => {
      //try to place the ship
      attempt = shipPlacement(ship);
      if (attempt[0] === 0) {
        tryPlacement();
      } else {
        return attempt;
      }
      return attempt;
    };
    result = tryPlacement(); //saves a successful placement
    // cg.allShips[ship].rotation = rotation;
    cg.allShips[ship].position = attempt[0]; //updates ship
    cg.board = attempt[1]; //updates board
  }
};

export { placeComputerShips };
