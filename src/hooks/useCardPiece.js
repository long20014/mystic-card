import { useState } from 'react';
import React from 'react';
import { useCardContext, flipUp } from 'context/card/index';

export const useCardPiece = (piece) => {
  const { state, dispatch } = useCardContext();
  
  const flipCardUp = (e) => {
    if (piece.state === 'down') {
      const index = state.cardArr.map((item) => item.id).indexOf(piece.id);
      const newPiece = {...piece, state: 'up'};
      state.cardArr[index] = newPiece;
      flipUp(dispatch, state.cardArr);
      console.log(state.cardArr);
    }
  };

  return {
    flipCardUp
  };
};