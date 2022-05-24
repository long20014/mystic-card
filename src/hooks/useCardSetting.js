import { useState, useEffect } from 'react';
import { useCardContext, setGameLevel } from 'context/card/index';
import CardGridService from 'services/card-grid.service';
import { levels } from 'data/levels';

const { getDirection } = CardGridService;

export const useCardSetting = () => {
  const { state, dispatch } = useCardContext();
  const [availableLevels, setAvailableLevels] = useState(getAvailableLevels());

  function changeGameLevel(level) {
    const targetLevel = findSuitableLevel(level.levelNumber, level.stageNumber);
    dispatch(setGameLevel(targetLevel));
  }

  function getAvailableLevels() {
    const levels = [];
    if (Object.keys(state.scoreBoard).length === 0) {
      levels.push({
        stageName: 'level-1_stage-1',
        levelNumber: 1,
        stageNumber: 1,
      });
    } else {
      for (const key in state.scoreBoard) {
        const level = state.scoreBoard[key];
        levels.push({
          stageName: level.stageName,
          levelNumber: level.levelNumber,
          stageNumber: level.stageNumber,
        });
      }
    }
    return levels;
  }

  function findSuitableLevel(levelNumber, stageNumber) {
    const direction = getDirection();
    const currentLevel = levels.find(
      (level) => level.levelNumber === levelNumber
    );
    const result = {
      ...currentLevel,
      currentStage: currentLevel.stages[stageNumber - 1],
      direction: direction,
      swap: currentLevel.swap,
      handleAfter2Flips: currentLevel.handleAfter2Flips,
      sendShiftSignal: currentLevel.sendShiftSignal,
    };
    return result;
  }

  useEffect(() => {
    setAvailableLevels(getAvailableLevels());
  }, [state.scoreBoard]);

  return { state, changeGameLevel, availableLevels };
};
