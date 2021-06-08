import React, { useContext, useReducer } from 'react';
import { CardContext } from './context';
import CardReducer from './reducer';
import CardGridService from 'services/card-grid.service';

const cardGridService = CardGridService();

export const useCardContext = () => {
  const { state, dispatch } = useContext(CardContext);

  return { state, dispatch };
};

export const CardStateProvider = ({ children }) => {
  const initialState = {
    cardArr: cardGridService.initCardArray(),
    gridSlots: null,
    isInit: false
  };

  const [state, dispatch] = useReducer(CardReducer, initialState);

  return <CardContext.Provider value={{ state, dispatch }}>{children}</CardContext.Provider>;
};

export * from './action';
