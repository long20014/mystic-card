import React, { useContext, useReducer, useMemo } from 'react';
import { CardContext } from './context';
import CardReducer from './reducer';
import CardGridService from 'services/card-grid.service';
import { levels } from 'data/levels';

const {
  initCardArray,
  getDirection,
  getRandomTurns,
  shiftSignalController,
  swapHandler,
  after2FlipsHandler,
} = CardGridService;

export const useCardContext = () => {
  const { state, dispatch } = useContext(CardContext);

  return { state, dispatch };
};

export const CardStateProvider = ({ children }) => {
  const cardArr = useMemo(() => initCardArray(), []);
  const direction = useMemo(() => getDirection(), []);
  const turnForRedirection = useMemo(() => getRandomTurns(3, 5), []);
  const currentLevel = levels[3];
  const currentStage = currentLevel.stages[0];
  const initialState = {
    cardArr: cardArr,
    arraySize: 4,
    isInit: false,
    goShift: false,
    scoreBoard: {},
    moveCount: 0,
    matchCount: 0,
    isWinning: false,
    isWaiting: false,
    shiftSignalController,
    swapHandler,
    after2FlipsHandler,
    gameLevel: {
      timeRemain: currentStage.timeLimit,
      turnForFlipDown: currentLevel.turnForFlipDown,
      turnForFlipDownCount: currentLevel.turnForFlipDown,
      turnForRedirection,
      levelNumber: currentLevel.levelNumber,
      stages: currentLevel.stages,
      currentStage: currentStage,
      direction: direction,
      swap: currentLevel.swap,
      handleAfter2Flips: currentLevel.handleAfter2Flips,
      sendShiftSignal: currentLevel.sendShiftSignal,
    },
  };

  const [state, dispatch] = useReducer(CardReducer, initialState);

  return (
    <CardContext.Provider value={{ state, dispatch }}>
      {children}
    </CardContext.Provider>
  );
};

export * from './action';
