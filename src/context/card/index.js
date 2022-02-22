import React, { useContext, useReducer, useMemo } from 'react';
import { CardContext } from './context';
import CardReducer from './reducer';
import CardGridService from 'services/card-grid.service';
import constants from 'utils/constants';
import { levels } from 'data/levels';

const { initCardArray, getDirection } = CardGridService;

export const useCardContext = () => {
  const { state, dispatch } = useContext(CardContext);

  return { state, dispatch };
};

export const CardStateProvider = ({ children }) => {
  const cardArr = useMemo(() => initCardArray(), []);
  const direction = useMemo(() => getDirection(), []);
  // const currentLevel = localStorage.getItem('gameLevels') || levels[2];
  const currentLevel = levels[1];
  const initialState = {
    cardArr: cardArr,
    isInit: false,
    goShift: false,
    moveCount: 0,
    matchCount: 0,
    isWinning: false,
    isWaiting: false,
    gameLevel: {
      arraySize: 4,
      levelNumber: currentLevel.levelNumber,
      stages: currentLevel.stages,
      currentStage: currentLevel.stages[0],
      swapMechanic: { swap: currentLevel.swapMechanic },
      after2FlipsHandler: { handle: currentLevel.after2FlipsHandler },
      shiftSignalController: {
        sendShiftSignal: currentLevel.shiftSignalController,
      },
      direction: direction,
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
