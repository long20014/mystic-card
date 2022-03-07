import React, { useState, useEffect } from 'react';
import CardGridService from 'services/card-grid.service';
import CardGridSlot from 'components/card-grid-slot';
import {
  useCardContext,
  updateCards,
  initGame,
  setWin,
  increaseMatchCount,
  restartGame,
} from 'context/card/index';
import { isEven, square } from 'utils/index';
import constants from 'utils/constants';
import { levels } from 'data/levels';

const { GRID_SIZE_LV2 } = constants;

const { findUnmatchedPieces, setLevel, getLevel, getDirection } =
  CardGridService;

export const useCardGrid = () => {
  const { state, dispatch } = useCardContext();

  const [showRestartButton, setShowRestartButton] = useState(false);

  const handleRestartGame = () => {
    dispatch(restartGame());
  };

  const handleWinGame = () => {
    dispatch(setWin(true));
  };

  const handleNextStage = () => {
    let currentLevel = getLevel(state);
    const direction = getDirection();
    const stageNumber = currentLevel.currentStage.stageNumber;
    if (stageNumber < currentLevel.stages.length) {
      setLevel(
        {
          ...currentLevel,
          currentStage: currentLevel.stages[stageNumber],
          direction: direction,
          swap: currentLevel.swapMechanic,
          handleAfter2flips: currentLevel.after2FlipsHandler,
          sendShiftSignal: currentLevel.shiftSignalController,
        },
        dispatch
      );
    } else if (currentLevel.levelNumber < levels.length) {
      currentLevel = levels[currentLevel.levelNumber];
      setLevel(
        {
          ...currentLevel,
          currentStage: currentLevel.stages[0],
          direction: direction,
          swap: currentLevel.swapMechanic,
          handleAfter2flips: currentLevel.after2FlipsHandler,
          sendShiftSignal: currentLevel.shiftSignalController,
        },
        dispatch
      );
    } else {
      alert('You have cleared all level');
    }
  };

  const handleStartGame = () => {
    if (!state.isInit) {
      dispatch(initGame(true));
    }
  };

  const testWinGame = () => {
    handleWinGame();
  };

  const getIsInit = () => {
    return state.isInit;
  };

  const getCardArr = () => {
    return state.cardArr;
  };

  const getGameLevel = () => {
    return state.gameLevel;
  };

  const getMoveCount = () => {
    return state.moveCount;
  };

  const getMatchCount = () => {
    return state.matchCount;
  };

  const getStar = (timeRemain) => {
    if (timeRemain > state.gameLevel.currentStage._3starTimeRemain) {
      return '3 stars';
    } else if (timeRemain > state.gameLevel.currentStage._2starTimeRemain) {
      return '2 stars';
    }
    return '1 star';
  };

  useEffect(() => {
    if (state.isInit) {
      // console.log('rerendered card grid');
      // console.log(state.cardArr);
    }
  });

  useEffect(() => {
    if (state.matchCount === square(state.gameLevel.arraySize) / 2) {
      handleWinGame();
    }
  }, [state.matchCount]);

  useEffect(() => {
    // if (state.isWinning) {
    //   setTimeout(() => alert('You win the game'), 500);
    // }
    setShowRestartButton(state.isWinning);
  }, [state.isWinning]);

  useEffect(() => {
    if (
      state.gameLevel.timeRemain !== state.gameLevel.currentStage.timeLimit &&
      state.isWinning
    ) {
      alert(`You got ${getStar(state.gameLevel.timeRemain)}`, 500);
    }
  }, [state.gameLevel.timeRemain]);

  useEffect(() => {
    if (isEven(state.moveCount)) {
      const unmatchedPieces = findUnmatchedPieces(state);
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
        dispatch(increaseMatchCount());
      }
    }
  }, [state.moveCount]);

  useEffect(() => {
    if (state.goShift) {
      state.gameLevel.swap(state, dispatch);
    }
  }, [state.goShift]);

  const renderGridSlots = (cardArr) => {
    const slots = [];
    if (cardArr && cardArr.length > 0) {
      const gridSize = GRID_SIZE_LV2.height * GRID_SIZE_LV2.width;
      for (let i = 0; i < gridSize; i++) {
        const piece = cardArr[i];
        slots.push(<CardGridSlot id={i} key={i} piece={piece} />);
      }
    }
    return slots;
  };

  const renderGridSlot = (cardPiece) => {
    return <CardGridSlot id={cardPiece.id} piece={cardPiece} />;
  };

  return {
    getCardArr,
    getMoveCount,
    getMatchCount,
    getGameLevel,
    renderGridSlots,
    renderGridSlot,
    testWinGame,
    handleRestartGame,
    handleNextStage,
    showRestartButton,
    handleStartGame,
    getIsInit,
  };
};
