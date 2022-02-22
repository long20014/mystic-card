import { type } from './type';

export const updateCards = (cardArr) => {
  return {
    type: type.UPDATE_CARDS,
    payload: {
      cardArr,
    },
  };
};

export const increaseMoveCount = () => {
  return {
    type: type.INCREASE_MOVE_COUNT,
  };
};

export const restartGame = () => {
  return {
    type: type.RESTART_GAME,
  };
};

export const increaseMatchCount = () => {
  return {
    type: type.INCREASE_MATCH_COUNT,
  };
};

export const decreaseMatchCount = () => {
  return {
    type: type.DECREASE_MATCH_COUNT,
  };
};

export const initGame = (isInit) => {
  return {
    type: type.INIT_GAME,
    payload: {
      isInit,
    },
  };
};

export const setWin = (isWinning) => {
  return {
    type: type.SET_WIN,
    payload: {
      isWinning,
    },
  };
};

export const setWait = (isWaiting) => {
  return {
    type: type.SET_WAIT,
    payload: {
      isWaiting,
    },
  };
};

export const setGameLevel = (level) => {
  return {
    type: type.SET_GAME_LEVEL,
    payload: {
      level,
    },
  };
};

export const setGoShift = (goShift) => {
  return {
    type: type.SET_GO_SHIFT,
    payload: {
      goShift,
    },
  };
};

export const setDirection = (direction) => {
  return {
    type: type.SET_DIRECTION,
    payload: {
      direction,
    },
  };
};
