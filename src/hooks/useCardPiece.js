import React, { useEffect, useRef } from 'react';
import {
  useCardContext,
  updateCards,
  setWait,
  increaseMoveCount,
  setGoShift,
} from 'context/card/index';
import CardGridService from 'services/card-grid.service';
import { Animated } from 'react-native';
import { isEven } from 'utils/index';
import constants from 'utils/constants';
import { usePrevious } from 'hooks/usePrevious';

const { UP, COMMON_TIMING } = constants;

const {
  flipCard,
  getCardIndex,
  resetTurnForFlipDownCount,
  flipDownAfterSomeTurns,
  isLastPiece,
} = CardGridService;

export const useCardPiece = (piece) => {
  const { state, dispatch } = useCardContext();
  const previousMatchCount = usePrevious(state.matchCount);
  const index = getCardIndex(state.cardArr, piece);
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
      useNativeDriver: true,
    }).start(() => callback());
  };

  const flipCardUp = (e) => {
    // console.log('flip up');
    if (state.isInit && piece.status === 'down' && !state.isWaiting) {
      flipCard(piece, state, updateCards, dispatch);
      dispatch(increaseMoveCount());
      startFlipAnimation(180, COMMON_TIMING, 0, () => {});
      if (isEven(state.moveCount + 1) && !state.isWaiting) {
        dispatch(setWait(true));
      }
      if (state.goShift) {
        dispatch(setGoShift(false));
      }
    }
  };

  const flipCardDown = () => {
    flipCard(piece, state, updateCards, dispatch);
    startFlipAnimation(0, COMMON_TIMING, 0, () => {
      if (state.isWaiting) {
        dispatch(setWait(false));
      }
    });
  };

  useEffect(() => {
    if (isEven(state.moveCount)) {
      setTimeout(() => {
        if (piece.status === 'up' && !piece.matched) {
          flipCardDown();
        }
        if (
          state.gameLevel.turnForFlipDown > 0 &&
          previousMatchCount !== state.matchCount
        ) {
          resetTurnForFlipDownCount(state, dispatch, previousMatchCount);
        }
        state.gameLevel.sendShiftSignal(
          state,
          dispatch,
          previousMatchCount,
          piece
        );
        if (isLastPiece(state, piece)) flipDownAfterSomeTurns(state, dispatch);
      }, COMMON_TIMING);
    }
  }, [state.moveCount, state.matchCount]);

  return {
    flipCardUp,
    getCardStatus,
    frontAnimatedStyle,
    backAnimatedStyle,
    state,
  };
};
