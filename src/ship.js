let ship = length => {
  let getLength = () => length;
  let position = {};
  const hit = (strikeCoordinates, position) => {
    position[strikeCoordinates] = 'hit';
    return position;
  };
  const shipIsSunk = position => {
    //change this to check if each value is equal to hit, or if every value equals hit
    if (Object.keys(position).length === 0) {
      //ships that haven've been placed won't cause
      return false;
    }
    //returns false if not sunk, true if sunk
    let sunk = !Object.values(position).includes('filled');
    return sunk;
  };

  return { getLength, hit, shipIsSunk, position };
};

export { ship };
