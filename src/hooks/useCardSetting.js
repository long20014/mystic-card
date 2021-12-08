import { useState, useEffect } from 'react';
import { useCardContext, setGameLevel } from 'context/card/index';

export const useCardSetting = () => {
  const { state, dispatch } = useCardContext();

  const changeGameLevel = (level) => {
    dispatch(setGameLevel(level));
  };

  return { state, changeGameLevel };
};
