import constants from 'utils/constants';
import { GridService } from 'services/grid.service';
import {
  updateCards,
  setWait,
  setGoShift,
  setGameLevel,
  setDirection,
  setTurnForFlipDownCount,
} from 'context/card/index';
import { getRandomInt, getRandomIntInRange, isEven } from 'utils/index';

const { LEFT, RIGHT, UP, DOWN, COMMON_TIMING } = constants;

const getRandomPieceName = (pieceNames) => {
  const splicePos = Math.floor((Math.random() * 100) % pieceNames.length);
  const pieceId = pieceNames.splice(splicePos, 1);
  return pieceId[0];
};

const getDirection = () => {
  const randomInt = getRandomInt(2);
  return randomInt === 1 ? LEFT : RIGHT;
};

const getRandomTurns = (min, max) => {
  return getRandomIntInRange(min, max) * 2;
};

const getOppositeDirection = (direction) => {
  return direction === LEFT ? RIGHT : LEfFT;
};

const getLevel = (state) => {
  return state.gameLevel;
};

const setLevel = (level, dispatch) => {
  dispatch(setGameLevel(level));
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

const getCardIndex = (cardArr, piece) => {
  return cardArr.map((item) => item.id).indexOf(piece.id);
};

const flipCard = (piece, state, updateCards, dispatch) => {
  let status = DOWN;
  const index = getCardIndex(state.cardArr, piece);
  if (piece.status === DOWN) status = UP;
  const newPiece = { ...piece, status: status };
  state.cardArr[index] = newPiece;
  dispatch(updateCards(state.cardArr));
};

const findUnmatchedPieces = (state) => {
  return state.cardArr.filter((card) => !card.matched && card.status === 'up');
};

const findMatchedPieces = (state) => {
  return state.cardArr.filter((card) => card.matched && card.status === 'up');
};

const findOtherPairMember = (pieces, piece) => {
  return pieces.find((item) => item.name === piece.name);
};

const swapLevel1 = (state, dispatch) => {
  if (state.goShift) {
    if (state.isWaiting) dispatch(setWait(false));
  }
  return;
};

const swapLevel2 = (state, dispatch) => {
  if (state.goShift) {
    setTimeout(() => {
      const shiftedArray = shiftUnMatchedItemsOfArray(
        state.cardArr,
        2,
        state.gameLevel.direction
      );
      console.log(shiftedArray);
      dispatch(updateCards(shiftedArray));
      if (state.isWaiting) dispatch(setWait(false));
    }, COMMON_TIMING + 100);
  }
};

const swapLevel3 = (state, dispatch) => {};

const swapLevel4 = (state, dispatch) => {};

const swapLevel5 = (state, dispatch) => {};

const swapLevel6 = (state, dispatch) => {};

const swapLevel7 = (state, dispatch) => {};

const swapLevel8 = (state, dispatch) => {};

const swapLevel9 = (state, dispatch) => {};

const swapLevel10 = (state, dispatch) => {};

const swapMechanic = {
  swapLevel1,
  swapLevel2,
  swapLevel3,
  swapLevel4,
  swapLevel5,
  swapLevel6,
  swapLevel7,
  swapLevel8,
  swapLevel9,
  swapLevel10,
};

const noHandler = (state, dispatch) => {
  return;
};

const flipDownAfterSomeTurns = (state, dispatch) => {
  // flipdown after some turn
  if (state.gameLevel.turnForFlipDownCount <= 0) {
    const matchedPieces = findMatchedPieces(state);
    const firstPiece = matchedPieces[0];
    const secondPiece = findOtherPairMember(matchedPieces, firstPiece);
    firstPiece.matched = false;
    secondPiece.matched = false;
    flipCard(firstPiece, state, updateCards, dispatch);
    flipCard(secondPiece, state, updateCards, dispatch);
  }
};

const resetTurnForFlipDownCount = (state, dispatch, prevMatchCount) => {
  if (
    state.gameLevel.turnForFlipDown > 0 &&
    prevMatchCount !== state.matchCount
  ) {
    dispatch(setTurnForFlipDownCount(state.gameLevel.turnForFlipDown));
  }
};

const reduceTurnForFlipDownCount = (state, dispatch) => {
  console.log(state.gameLevel.turnForFlipDownCount);
  if (state.gameLevel.turnForFlipDownCount >= 2) {
    dispatch(setTurnForFlipDownCount(state.gameLevel.turnForFlipDownCount - 2));
  }
};

const changeDirectionAfterSomeTurns = (state, dispatch) => {
  if (state.moveCount % state.gameLevel.turnForRedirection === 0) {
    dispatch(setDirection(getOppositeDirection()));
  }
};

const after2FlipsHandler = {
  noHandler,
  reduceTurnForFlipDownCount,
};

const sendShiftSignal = (state, dispatch, piece) => {
  if (!state.goShift) {
    const index = state.cardArr.indexOf(piece);
    const isLastPiece = index === state.cardArr.length - 1;
    if (isLastPiece) dispatch(setGoShift(true));
  }
};

const shiftLevel1 = (state, dispatch, prevMatchCount, piece) => {
  if (isEven(state.moveCount)) {
    sendShiftSignal(state, dispatch, piece);
  }
};

const shiftLevel2 = (state, dispatch, prevMatchCount, piece) => {
  if (prevMatchCount !== state.matchCount) {
    sendShiftSignal(state, dispatch, piece);
  }
};

const shiftLevel3 = (state, dispatch, prevMatchCount, piece) => {
  sendShiftSignal(state, dispatch, piece);
};

const shiftSignalController = {
  shiftLevel1,
  shiftLevel2,
  shiftLevel3,
};

const CardGridService = {
  getRandomPieceName,
  shiftUnMatchedItemsOfArray,
  initCardArray,
  getDirection,
  flipCard,
  getCardIndex,
  findUnmatchedPieces,
  swapMechanic,
  after2FlipsHandler,
  shiftSignalController,
  setLevel,
  getLevel,
  getOppositeDirection,
  getRandomTurns,
  resetTurnForFlipDownCount,
};

export default CardGridService;
