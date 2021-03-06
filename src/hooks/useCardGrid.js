import { useState, useEffect } from 'react';
import React from 'react';
import CardGridService from 'services/card-grid.service';
import constants from 'utils/constants';
import CardGridSlot from 'components/card-grid-slot';
import {
  useCardContext,
  updateCards,
  initGame,
  setWait,
} from 'context/card/index';
import { isEven } from 'utils/index';

// const { } = CardGridService;

export const useCardGrid = () => {
  // const [grid, setGrid] = useState({});
  const { state, dispatch } = useCardContext();
  const [flipDown, setFlipDown] = useState(false);

  const getCardArr = () => {
    return state.cardArr;
  };

  const findUnmatchedPieces = () => {
    return state.cardArr.filter(
      (card) => !card.matched && card.status === 'up'
    );
  };

  useEffect(() => {
    if (!state.isInit) {
      dispatch(initGame(true));
      console.log('card-grid');
    }
  }, [state.isInit]);

  useEffect(() => {
    if (state.isInit) {
      console.log('rerender card grid');
      console.log(state.cardArr);
    }
  });

  useEffect(() => {
    if (isEven(state.moveCount)) {
      const unmatchedPieces = findUnmatchedPieces();
      if (
        unmatchedPieces.length >= 2 &&
        unmatchedPieces[0].name === unmatchedPieces[1].name
      ) {
        const index0 = state.cardArr.indexOf(unmatchedPieces[0]);
        const index1 = state.cardArr.indexOf(unmatchedPieces[1]);
        unmatchedPieces[0].matched = true;
        unmatchedPieces[1].matched = true;
        state.cardArr[index0] = unmatchedPieces[0];
        state.cardArr[index1] = unmatchedPieces[1];
        dispatch(updateCards(state.cardArr));
      }
      if (state.isWaiting) dispatch(setWait(false));
    }
  }, [state.moveCount]);

  const renderGridSlots = (cardArr) => {
    const slots = [];
    if (cardArr && cardArr.length > 0) {
      const gridSize =
        constants.GRID_SIZE_LV2.height * constants.GRID_SIZE_LV2.width;
      for (let i = 0; i < gridSize; i++) {
        const piece = cardArr[i];
        slots.push(<CardGridSlot id={i} key={i} piece={piece} />);
      }
    }
    return slots;
  };

  return {
    getCardArr,
    renderGridSlots,
  };
};
