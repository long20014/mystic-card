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

const findEmptySlots = (slots) => {
  let emptySlots = [];
  slots.forEach((slot) => {
    if (!slot.hasChildNodes()) {
      emptySlots.push(slot);
    }
  });
  return emptySlots;
};

const coloringEmptySlots = (emptySlots, color) => {
  emptySlots.forEach((emptySlot) => (emptySlot.style.backgroundColor = color));
};

const transformSlots = (slots, emptySlots, arraySize) => {
  const transformedSlots = [];
  const emptySlotIds = getIdNumbers(emptySlots);

  slots.forEach((slot) => {
    const slotId = getIdNumber(slot);
    let draggableChecked = false;
    emptySlots.forEach((emptySlot) => {
      if (!emptySlotIds.includes(slotId) && !draggableChecked) {
        if (isAdjacent(slot, emptySlot, arraySize)) {
          slot.firstElementChild.draggable = true;
          draggableChecked = true;
        } else {
          slot.firstElementChild.draggable = false;
        }
      }
    });
    transformedSlots.push(slot);
  });
  return transformedSlots;
};

const isAdjacent = (slot, comparedSlot, arraySize) => {
  const slotId = getIdNumber(slot);
  const comparedSlotId = getIdNumber(comparedSlot);
  if (
    (slotId === comparedSlotId + 1 &&
      Math.floor(slotId / arraySize) ===
        Math.floor(comparedSlotId / arraySize)) ||
    (slotId === comparedSlotId - 1 &&
      Math.floor(slotId / arraySize) ===
        Math.floor(comparedSlotId / arraySize)) ||
    slotId === comparedSlotId + arraySize ||
    slotId === comparedSlotId - arraySize
  ) {
    return true;
  }
  return false;
};

const swapPieces = (slot1, slot2, arraySize) => {
  if (
    slot1.hasChildNodes &&
    slot2.hasChildNodes &&
    isAdjacent(slot1, slot2, arraySize)
  ) {
    const slot1Copy = slot1.cloneNode(true);
    const slot2Copy = slot2.cloneNode(true);
    slot1Copy.replaceChild(slot1.firstElementChild, slot1Copy.childNodes[0]);
    slot2Copy.replaceChild(slot2.firstElementChild, slot2Copy.childNodes[0]);
    slot1.appendChild(slot2Copy.firstElementChild);
    slot2.appendChild(slot1Copy.firstElementChild);
    return true;
  }
  return false;
};

export const GridService = {
  getPieceIdSet,
  getRandomPieceId,
  getIdNumber,
  getIdNumbers,
  findEmptySlots,
  coloringEmptySlots,
  transformSlots,
  isAdjacent,
  swapPieces,
};
