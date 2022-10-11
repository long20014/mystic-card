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
  saveScore,
} from 'context/card/index';
import { isEven, square } from 'utils/index';
import constants from 'utils/constants';
import { levels } from 'data/levels';
import { Share, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { GRID_SIZE_LV2 } = constants;

const {
  findUnmatchedPieces,
  setLevel,
  getLevel,
  getDirection,
  changeDirectionAfterSomeTurns,
  getStageName,
  getCurrentLevelNumber,
  getCurrentStageNumber,
} = CardGridService;

const storeScore = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('scoreBoard', jsonValue);
  } catch (e) {
    // saving error
  }
};

export const useCardGrid = (navigation) => {
  const { state, dispatch } = useCardContext();

  const [showRestartButton, setShowRestartButton] = useState(false);
  const [showNextStageButton, setShowNextStageButton] = useState(false);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSwap = () => {
    state.swapHandler.setProps(state, dispatch);
    state.gameLevel.swap();
  };

  const handleAfter2Flips = () => {
    state.after2FlipsHandler.setProps(state, dispatch);
    state.gameLevel.handleAfter2Flips();
  };

  const handleRestartGame = () => {
    dispatch(restartGame());
  };

  const handleWinGame = () => {
    dispatch(setWin(true));
  };

  const handleNextStage = () => {
    let currentLevel = getLevel(state);
    const direction = getDirection();
    function getLevelIndex(levelNumber) {
      const targetLevel = levels.find(
        (level) => level.levelNumber === levelNumber
      );
      if (targetLevel) {
        const result = levels.indexOf(targetLevel);
        return result;
      }
      throw new Error('target level not found');
    }
    function isLastLevel(index) {
      return index === levels.length - 1;
    }
    const currentlevelIndex = getLevelIndex(currentLevel.levelNumber);
    if (currentLevel.currentStage.stageNumber < currentLevel.stages.length) {
      setLevel(
        {
          ...currentLevel,
          currentStage:
            currentLevel.stages[currentLevel.currentStage.stageNumber],
          direction: direction,
          swap: currentLevel.swap,
          handleAfter2Flips: currentLevel.handleAfter2Flips,
          sendShiftSignal: currentLevel.sendShiftSignal,
        },
        dispatch
      );
    } else if (!isLastLevel(currentlevelIndex)) {
      currentLevel = levels[currentlevelIndex + 1];
      setLevel(
        {
          ...currentLevel,
          currentStage: currentLevel.stages[0],
          direction: direction,
          swap: currentLevel.swap,
          handleAfter2Flips: currentLevel.handleAfter2Flips,
          sendShiftSignal: currentLevel.sendShiftSignal,
        },
        dispatch
      );
    } else {
      alert('You have cleared all level');
    }
  };

  const handleStartGame = () => {
    if (!state.isInit) {
      console.log(state.cardArr);
      console.log(state.scoreBoard);
      console.log(calculateTotalStar() + ' stars');
      dispatch(initGame(true));
    }
  };

  const handleBackToMenu = () => {
    handleRestartGame();
    setTimeout(() => navigation.navigate('Menu'), 0);
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

  const getStarCount = (timeRemain) => {
    if (timeRemain > state.gameLevel.currentStage._3starTimeRemain) {
      return 3;
    } else if (timeRemain > state.gameLevel.currentStage._2starTimeRemain) {
      return 2;
    }
    return 1;
  };

  const getStarCountString = (starCount) => {
    if (starCount > 1) {
      return starCount + ' stars';
    }
    return starCount + ' star';
  };

  const calculateTotalStar = () => {
    let result = 0;
    for (const property in state.scoreBoard) {
      result += state.scoreBoard[property]['star'];
    }
    return result;
  };

  const calculateBestTime = (stageName, state, timeRemain) => {
    if (state.scoreBoard[stageName]) {
      const bestTime =
        state.scoreBoard[stageName].bestTime < timeRemain
          ? timeRemain
          : state.scoreBoard[stageName].bestTime;
      return bestTime;
    }
    return timeRemain;
  };

  useEffect(() => {
    if (state.isInit) {
      // console.log('rerendered card grid');
      // console.log(state.cardArr);
      console.log(levels);
    }
  }, []);

  useEffect(() => {
    storeScore(state.scoreBoard);
  }, [state.scoreBoard]);

  useEffect(() => {
    if (state.matchCount === square(state.arraySize) / 2) {
      handleWinGame();
    }
  }, [state.matchCount]);

  useEffect(() => {
    setShowRestartButton(state.isWinning);
    setShowNextStageButton(state.isWinning);
  }, [state.isWinning, state.isInit]);

  useEffect(() => {
    if (state.gameLevel.timeRemain <= 0) {
      setShowRestartButton(true);
    }
  }, [state.gameLevel.timeRemain]);

  useEffect(() => {
    if (
      state.gameLevel.timeRemain !== state.gameLevel.currentStage.timeLimit &&
      state.isWinning
    ) {
      const startCount = getStarCount(state.gameLevel.timeRemain);
      const startCountString = getStarCountString(startCount);
      const stageName = getStageName(state);
      const currentLevelNumber = getCurrentLevelNumber(state);
      const currentStageNumber = getCurrentStageNumber(state);
      const bestTime = calculateBestTime(
        stageName,
        state,
        state.gameLevel.timeRemain
      );
      dispatch(
        saveScore(
          currentLevelNumber,
          currentStageNumber,
          stageName,
          startCount,
          bestTime
        )
      );
      setTimeout(() => {
        // Only displayed on mobile
        Alert.alert(
          'Congratulation',
          `You win!!! You got ${startCountString}`,
          [
            {
              text: 'Share',
              onPress: () => onShare(),
            },
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]
        );
      }, 500);
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
      handleAfter2Flips(state, dispatch);
      changeDirectionAfterSomeTurns(state, dispatch);
    }
  }, [state.moveCount]);

  useEffect(() => {
    if (state.goShift) {
      handleSwap();
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
    showNextStageButton,
    handleStartGame,
    getIsInit,
    state,
    onShare,
    handleBackToMenu,
  };
};
