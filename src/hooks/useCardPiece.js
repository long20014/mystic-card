import React, { useEffect, useRef } from 'react';
import {
  useCardContext,
  updateCards,
  setWait,
  increaseMoveCount,
} from 'context/card/index';
import CardGridService from 'services/card-grid.service';
import { Animated } from 'react-native';
import { isEven } from 'utils/index';

const { flipCard, getCardIndex } = CardGridService;

export const useCardPiece = (piece) => {
  const { state, dispatch } = useCardContext();
  const index = getCardIndex(state, piece);
  const getCardStatus = () => state.cardArr[index].status;
  const animatedValue = useRef(new Animated.Value(0));
  const frontInterpolate = animatedValue.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  const backInterpolate = animatedValue.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const frontAnimatedStyle = {
    transform: [
      {
        rotateY: frontInterpolate,
      },
    ],
  };
  const backAnimatedStyle = {
    transform: [
      {
        rotateY: backInterpolate,
      },
    ],
  };

  const startFlipAnimation = (value, duration, delay, callback) => {
    Animated.timing(animatedValue.current, {
      toValue: value,
      duration: duration,
      delay: delay,
    }).start(() => callback());
  };

  const flipCardUp = (e) => {
    if (piece.status === 'down' && !state.isWaiting) {
      startFlipAnimation(180, 500, 0, () => {
        flipCard(piece, state, updateCards, dispatch);
        dispatch(increaseMoveCount());
        console.log(state.moveCount);
      });
      if (isEven(state.moveCount + 1) && !state.isWaiting) {
        dispatch(setWait(true));
      }
    }
  };

  const flipCardDown = () => {
    if (piece.status === 'up' && !piece.matched) {
      startFlipAnimation(0, 500, 0, () => {
        flipCard(piece, state, updateCards, dispatch);
        console.log(state.moveCount);
      });
      if (state.isWaiting) {
        dispatch(setWait(false));
      }
    }
  };

  useEffect(() => {
    if (isEven(state.moveCount) && !state.isWaiting) {
      setTimeout(() => flipCardDown(), 1000);
    }
  }, [state.moveCount, state.isWaiting]);

  return {
    flipCardUp,
    getCardStatus,
    frontAnimatedStyle,
    backAnimatedStyle,
  };
};
