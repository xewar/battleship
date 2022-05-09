let ship = length => {
  let getLength = () => length;
  let hitMap = new Array(length).fill(0);

  const hit = strikePosition => {
    hitMap[strikePosition] = 1;
    return hitMap;
  };
  const isSunk = hitMap => {
    let sunk = hitMap.every(position => position === 1);
    return sunk;
  };

  return { getLength, hit, isSunk };
};

export { ship };

// let carrier = ship(5)
// Carrier	5
// Battleship	4
// Cruiser	3
// Submarine	3
// Destroyer	2
