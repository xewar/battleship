let ship = length => {
  let getLength = () => length;
  let position = {};
  let rotation = 'horizontal';
  const hit = (strikeCoordinates, position) => {
    position[strikeCoordinates] = 'hit';
    return position;
  };
  const shipIsSunk = position => {
    //returns false if not sunk, true if sunk
    let sunk = !Object.values(position).includes('filled');
    return sunk;
  };

  return { getLength, hit, shipIsSunk, position, rotation };
};

export { ship };
