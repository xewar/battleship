let ship = length => {
  let getLength = () => length;
  let position = {};
  const hit = strikeCoordinates => {
    position[strikeCoordinates] = 'hit';
    return position;
  };
  const isSunk = position => {
    let sunk = !Object.values(position).includes('filled');
    return sunk;
  };

  return { getLength, hit, isSunk, position };
};

export { ship };

// Carrier	5
// Battleship	4
// Cruiser	3
// Submarine	3
// Destroyer	2
