const getIdNumber = (item) => {
  return +item.id.split('-')[1];
};

const getIdNumbers = (items) => {
  const ids = [];
  items.forEach((item) => {
    const id = getIdNumber(item);
    ids.push(id);
  });
  return ids;
};

const getPieceIdSet = (gridSize, emptySlotQuantity = 0) => {
  const pieceIdSet = [];
  for (let i = 0; i < gridSize - emptySlotQuantity; i++) {
    pieceIdSet.push(i);
  }
  return pieceIdSet;
};

const getRandomPieceId = (pieceIdSet) => {
  const splicePos = Math.floor((Math.random() * 100) % pieceIdSet.length);
  const pieceId = pieceIdSet.splice(splicePos, 1);
  return pieceId[0];
};

export const GridService = {
  getPieceIdSet,
  getRandomPieceId,
  getIdNumber,
  getIdNumbers,
};
