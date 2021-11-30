import React, { useContext, useReducer } from 'react';
import { CardContext } from './context';
import CardReducer from './reducer';
import CardGridService from 'services/card-grid.service';
import { getRandomInt } from 'utils/index';

const { initCardArray } = CardGridService;

export const useCardContext = () => {
  const { state, dispatch } = useContext(CardContext);

  return { state, dispatch };
};

export const CardStateProvider = ({ children }) => {
  const initialState = {
    cardArr: initCardArray(),
    gridSlots: null,
    isInit: false,
    moveCount: 0,
    isWinning: false,
    isWaiting: false,
    gameLevel: {
      level: 'Hard',
      arraySize: 4,
      shiftCase: getRandomInt(2),
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
