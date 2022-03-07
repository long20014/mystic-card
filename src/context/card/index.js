import React, { useContext, useReducer, useMemo } from 'react';
import { CardContext } from './context';
import CardReducer from './reducer';
import CardGridService from 'services/card-grid.service';
import { levels } from 'data/levels';

const { initCardArray, getDirection, getRandomTurns } = CardGridService;

export const useCardContext = () => {
  const { state, dispatch } = useContext(CardContext);

  return { state, dispatch };
};

export const CardStateProvider = ({ children }) => {
  const cardArr = useMemo(() => initCardArray(), []);
  const direction = useMemo(() => getDirection(), []);
  const turnForRedirection = useMemo(() => getRandomTurns(3, 5), []);
  const currentLevel = levels[0];
  const currentStage = currentLevel.stages[2];
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
    gameLevel: {
      timeRemain: currentStage.timeLimit,
      turnForFlipdown: currentLevel.turnForFlipdown,
      turnForRedirection,
      levelNumber: currentLevel.levelNumber,
      stages: currentLevel.stages,
      currentStage: currentStage,
      direction: direction,
      swap: currentLevel.swapMechanic,
      handleAfter2flips: currentLevel.after2FlipsHandler,
      sendShiftSignal: currentLevel.shiftSignalController,
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
