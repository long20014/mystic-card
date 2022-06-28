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
import { getRandomInt, getRandomIntInRange } from 'utils/index';

const { LEFT, RIGHT, DOWN, COMMON_TIMING } = constants;

const getRandomPieceName = (pieceNames) => {
  const splicePos = Math.floor((Math.random() * 100) % pieceNames.length);
  const pieceId = pieceNames.splice(splicePos, 1);
  return pieceId[0];
};

const getDirection = () => {
  const randomInt = getRandomInt(2);
  return randomInt === 1 ? LEFT : RIGHT;
};

const getRandomEvenTurns = (min, max) => {
  return getRandomIntInRange(parseInt(min / 2), parseInt(max / 2)) * 2;
};

const getOppositeDirection = (direction) => {
  return direction === LEFT ? RIGHT : LEFT;
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

const getStageName = (state) => {
  return `level-${getCurrentLevelNumber(state)}_stage-${getCurrentStageNumber(
    state
  )}`;
};

const getCurrentLevelNumber = (state) => {
  return state.gameLevel.levelNumber;
};

const getCurrentStageNumber = (state) => {
  return state.gameLevel.currentStage.stageNumber;
};

const getCardIndex = (cardArr, piece) => {
  return cardArr.map((item) => item.id).indexOf(piece.id);
};

const flipCard = (piece, state, updateCards, dispatch, status) => {
  const index = getCardIndex(state.cardArr, piece);
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
  return pieces.find(
    (item) => item.id !== piece.id && item.name === piece.name
  );
};

const flipDownAfterSomeTurns = (state, dispatch) => {
  // flipdown after some turn
  if (
    state.gameLevel.turnForFlipDown > 0 &&
    state.gameLevel.turnForFlipDownCount <= 0
  ) {
    const matchedPieces = findMatchedPieces(state);
    if (matchedPieces && matchedPieces.length >= 2) {
      const firstPiece = matchedPieces[0];
      const secondPiece = findOtherPairMember(matchedPieces, firstPiece);
      firstPiece.matched = false;
      secondPiece.matched = false;
      const index0 = state.cardArr.indexOf(firstPiece);
      const index1 = state.cardArr.indexOf(secondPiece);
      state.cardArr[index0] = firstPiece;
      state.cardArr[index1] = secondPiece;
      dispatch(updateCards(state.cardArr));
    }
  }
};

const isLastPiece = (state, piece) => {
  let targetPiece = piece;
  // only performing find if 2 last cards are flipped up.
  if (piece.status === 'up' && !piece.matched) {
    targetPiece = state.cardArr.find((card) => card.id === piece.id);
  }
  const index = state.cardArr.indexOf(targetPiece);
  const result = index === state.cardArr.length - 1;
  return result;
};

const changeDirectionAfterSomeTurns = (state, dispatch) => {
  if (
    state.gameLevel.turnForRedirection > 0 &&
    state.moveCount % state.gameLevel.turnForRedirection === 0
  ) {
    console.log('redirect');
    dispatch(setDirection(getOppositeDirection(state.gameLevel.direction)));
  }
};

const resetTurnForFlipDownCount = (state, dispatch) => {
  dispatch(setTurnForFlipDownCount(state.gameLevel.turnForFlipDown));
};

function SwapHandler() {
  const self = this;

  this.setProps = function (state, dispatch) {
    this.state = state;
    this.dispatch = dispatch;
  };

  this.swapLevel1 = () => {
    if (self.state.goShift) {
      if (self.state.isWaiting) self.dispatch(setWait(false));
    }
    return;
  };

  this.swapLevel2 = () => {
    if (self.state.goShift) {
      setTimeout(() => {
        const shiftedArray = shiftUnMatchedItemsOfArray(
          self.state.cardArr,
          2,
          self.state.gameLevel.direction
        );
        console.log(shiftedArray);
        self.dispatch(updateCards(shiftedArray));
        if (self.state.isWaiting) self.dispatch(setWait(false));
      }, COMMON_TIMING + 100);
    }
  };
}

function After2FlipsHandler() {
  const self = this;

  this.setProps = function (state, dispatch) {
    this.state = state;
    this.dispatch = dispatch;
  };

  this.noHandler = () => {
    return;
  };

  this.reduceTurnForFlipDownCount = () => {
    console.log(self.state.gameLevel.turnForFlipDownCount);
    if (self.state.gameLevel.turnForFlipDownCount >= 2) {
      self.dispatch(
        setTurnForFlipDownCount(self.state.gameLevel.turnForFlipDownCount - 2)
      );
    }
  };
}

function ShiftSignalController() {
  const self = this;

  const sendShiftSignal = (state, dispatch, piece) => {
    if (!state.goShift && isLastPiece(state, piece)) {
      dispatch(setGoShift(true));
    }
  };

  this.setProps = function (state, dispatch, previousMatchCount, piece) {
    this.state = state;
    this.dispatch = dispatch;
    this.previousMatchCount = previousMatchCount;
    this.piece = piece;
  };

  this.afterMatchShift = () => {
    if (self.previousMatchCount !== self.state.matchCount) {
      sendShiftSignal(self.state, self.dispatch, self.piece);
    }
  };

  this.afterFlipShift = () => {
    sendShiftSignal(self.state, self.dispatch, self.piece);
  };
}

const swapHandler = new SwapHandler();
const after2FlipsHandler = new After2FlipsHandler();
const shiftSignalController = new ShiftSignalController();

const CardGridService = {
  getRandomPieceName,
  shiftUnMatchedItemsOfArray,
  initCardArray,
  getDirection,
  flipCard,
  getCardIndex,
  findUnmatchedPieces,
  swapHandler,
  after2FlipsHandler,
  shiftSignalController,
  setLevel,
  getLevel,
  getStageName,
  getCurrentLevelNumber,
  getCurrentStageNumber,
  getOppositeDirection,
  getRandomEvenTurns,
  resetTurnForFlipDownCount,
  flipDownAfterSomeTurns,
  isLastPiece,
  changeDirectionAfterSomeTurns,
};

export default CardGridService;
