import constants from 'utils/constants';
import { GridService } from 'services/grid.service';

const { LEFT, RIGHT, UP, DOWN } = constants;

const getRandomPieceName = (pieceNames) => {
  const splicePos = Math.floor((Math.random() * 100) % pieceNames.length);
  const pieceId = pieceNames.splice(splicePos, 1);
  return pieceId[0];
};

const shiftUnMatchedItemsOfArray = (arr, steps, direction) => {
  function shiftArrayToLeft(arr, steps) {
    const newArr = arr.concat(arr.splice(0, steps));
    return newArr;
  }
  function shiftArrayToRight(arr, steps) {
    const newArr = arr.concat(arr.splice(0, arr.length - steps));
    return newArr;
  }
  let newArr = JSON.parse(JSON.stringify(arr));
  let unmatchedItems = arr.filter((item) => !item.matched);
  let count = 0;
  if (direction === LEFT) {
    unmatchedItems = shiftArrayToLeft(unmatchedItems, steps);
  } else {
    unmatchedItems = shiftArrayToRight(unmatchedItems, steps);
  }
  for (let i = 0; i < arr.length; i++) {
    if (!newArr[i].matched) {
      newArr[i] = unmatchedItems[count];
      count++;
    }
  }
  return newArr;
};

const initCardArray = () => {
  const cardArr = [];
  const gridSize =
    constants.GRID_SIZE_LV2.height * constants.GRID_SIZE_LV2.width;
  const pieceIdSet = GridService.getPieceIdSet(gridSize);
  const pieceNames = [
    'A',
    'A',
    'B',
    'B',
    'C',
    'C',
    'D',
    'D',
    'E',
    'E',
    'F',
    'F',
    'G',
    'G',
    'H',
    'H',
  ];
  for (let i = 0; i < gridSize; i++) {
    const name = getRandomPieceName(pieceNames);
    let pieceId = GridService.getRandomPieceId(pieceIdSet);
    cardArr.push({
      id: pieceId,
      name: name,
      matched: false,
      status: DOWN,
    });
  }
  return cardArr;
};

const flipCard = (piece, state, updateCards, dispatch) => {
  let status = DOWN;
  const index = getCardIndex(state, piece);
  if (piece.status === DOWN) status = UP;
  const newPiece = { ...piece, status: status };
  state.cardArr[index] = newPiece;
  dispatch(updateCards(state.cardArr));
};

const getCardIndex = (state, piece) =>
  state.cardArr.map((item) => item.id).indexOf(piece.id);

const level1 = () => {};

const level2 = () => {};

const level3 = () => {};

const level4 = () => {};

const level5 = () => {};

const level6 = () => {};

const level7 = () => {};

const level8 = () => {};

const level9 = () => {};

const level10 = () => {};

const swapMechanic = {
  level1,
  level2,
  level3,
  level4,
  level5,
  level6,
  level7,
  level8,
  level9,
  level10,
};

const CardGridService = {
  getRandomPieceName,
  shiftUnMatchedItemsOfArray,
  initCardArray,
  flipCard,
  getCardIndex,
  swapMechanic,
};

export default CardGridService;
