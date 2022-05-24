import CardGridService from 'services/card-grid.service';

const {
  swapHandler,
  after2FlipsHandler,
  shiftSignalController,
  getRandomEvenTurns,
} = CardGridService;

const level1 = {
  levelNumber: 1,
  turnForFlipDown: 0,
  turnForRedirection: 0,
  swap: swapHandler.swapLevel1,
  handleAfter2Flips: after2FlipsHandler.noHandler,
  sendShiftSignal: shiftSignalController.afterFlipShift,
  hint: `Nothing special`,
  stages: [
    {
      stageNumber: 1,
      timeLimit: 180, //second
      _3starTimeRemain: 120, //second
      _2starTimeRemain: 60,
      reward: null,
      description: `Finish this stage with remain time > 120s to earn 3 stars
      Finish this stage with remain time > 60s to earn 2 stars`,
    },
    {
      stageNumber: 2,
      timeLimit: 120, //second
      _3starTimeRemain: 80, //second
      _2starTimeRemain: 40,
      reward: null,
      description: `Finish this stage with remain time > 80s to earn 3 stars
      Finish this stage with remain time > 40s to earn 2 stars`,
    },
    {
      stageNumber: 3,
      timeLimit: 90, //second
      _3starTimeRemain: 60, //second
      _2starTimeRemain: 30,
      reward: null,
      description: `Finish this stage with remain time > 60s to earn 3 stars
      Finish this stage with remain time > 30s to earn 2 stars`,
    },
  ],
};

const level2 = {
  levelNumber: 2,
  turnForFlipDown: 0,
  turnForRedirection: 0,
  swap: swapHandler.swapLevel2,
  handleAfter2Flips: after2FlipsHandler.noHandler,
  sendShiftSignal: shiftSignalController.afterMatchShift,
  hint: `Each times you found a matched pair, the cards will shift
  left or right 2 square, the shift direction remain through the stage`,
  stages: [
    {
      stageNumber: 1,
      timeLimit: 180, //second
      _3starTimeRemain: 120, //second
      _2starTimeRemain: 60,
      reward: null,
      description: `Finish this stage with remain time > 120s to earn 3 stars
      Finish this stage with remain time > 60s to earn 2 stars`,
    },
    {
      stageNumber: 2,
      timeLimit: 150, //second
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 50,
      reward: null,
      description: `Finish this stage with remain time > 100s to earn 3 stars
      Finish this stage with remain time > 50s to earn 2 stars`,
    },
    {
      stageNumber: 3,
      timeLimit: 120, //second
      _3starTimeRemain: 80, //second
      _2starTimeRemain: 40,
      reward: null,
      description: `Finish this stage with remain time > 80s to earn 3 stars
      Finish this stage with remain time > 40s to earn 2 stars`,
    },
  ],
};

const level3 = {
  levelNumber: 3,
  turnForFlipDown: 0,
  turnForRedirection: 0,
  swap: swapHandler.swapLevel2,
  handleAfter2Flips: after2FlipsHandler.noHandler,
  sendShiftSignal: shiftSignalController.afterFlipShift,
  hint: `Each 2 times you flip the card, the cards will shift
  left or right 2 square, the shift direction remain through the stage`,
  stages: [
    {
      stageNumber: 1,
      timeLimit: 420, //second
      _3starTimeRemain: 210, //second
      _2starTimeRemain: 120,
      reward: null,
      description: `Finish this stage with remain time > 210s to earn 3 stars
      Finish this stage with remain time > 120s to earn 2 stars`,
    },
    {
      stageNumber: 2,
      timeLimit: 360, //second
      _3starTimeRemain: 180, //second
      _2starTimeRemain: 120,
      reward: null,
      description: `Finish this stage with remain time > 180s to earn 3 stars
      Finish this stage with remain time > 120s to earn 2 stars`,
    },
    {
      stageNumber: 3,
      timeLimit: 300, //second
      _3starTimeRemain: 180, //second
      _2starTimeRemain: 90,
      reward: null,
      description: `Finish this stage with remain time > 180s to earn 3 stars
      Finish this stage with remain time > 90s to earn 2 stars`,
    },
  ],
};

const level4 = {
  levelNumber: 4,
  turnForFlipDown: 0,
  turnForRedirection: getRandomEvenTurns(8, 12),
  swap: swapHandler.swapLevel2,
  handleAfter2Flips: after2FlipsHandler.noHandler,
  sendShiftSignal: shiftSignalController.afterFlipShift,
  hint: `Each 2 times you flip the card, the cards will shift
  left or right 2 square, the shift direction remain through the stage`,
  stages: [
    {
      stageNumber: 1,
      timeLimit: 420, //second
      _3starTimeRemain: 210, //second
      _2starTimeRemain: 120,
      reward: null,
      description: `Finish this stage with remain time > 210s to earn 3 stars
      Finish this stage with remain time > 120s to earn 2 stars`,
    },
    {
      stageNumber: 2,
      timeLimit: 360, //second
      _3starTimeRemain: 180, //second
      _2starTimeRemain: 120,
      reward: null,
      description: `Finish this stage with remain time > 180s to earn 3 stars
      Finish this stage with remain time > 120s to earn 2 stars`,
    },
    {
      stageNumber: 3,
      timeLimit: 300, //second
      _3starTimeRemain: 180, //second
      _2starTimeRemain: 90,
      reward: null,
      description: `Finish this stage with remain time > 180s to earn 3 stars
      Finish this stage with remain time > 90s to earn 2 stars`,
    },
  ],
};

const level9 = {
  levelNumber: 9,
  turnForFlipDown: 10,
  turnForRedirection: 0,
  swap: swapHandler.swapLevel2,
  handleAfter2Flips: after2FlipsHandler.reduceTurnForFlipDownCount,
  sendShiftSignal: shiftSignalController.afterFlipShift,
  hint: `Each 2 times you flip the card, the cards will shift
  left or right 2 square, the shift direction remain unchanged 
  throughout the stage. After 10 consecutive incorrect flip, 
  the matched cards will be flip down each 2 turn.`,
  stages: [
    {
      stageNumber: 1,
      timeLimit: 420, //second
      _3starTimeRemain: 210, //second
      _2starTimeRemain: 120,
      reward: null,
      description: `Finish this stage with remain time > 210s to earn 3 stars
      Finish this stage with remain time > 120s to earn 2 stars`,
    },
    {
      stageNumber: 2,
      timeLimit: 360, //second
      _3starTimeRemain: 180, //second
      _2starTimeRemain: 120,
      reward: null,
      description: `Finish this stage with remain time > 180s to earn 3 stars
      Finish this stage with remain time > 120s to earn 2 stars`,
    },
    {
      stageNumber: 3,
      timeLimit: 300, //second
      _3starTimeRemain: 180, //second
      _2starTimeRemain: 90,
      reward: null,
      description: `Finish this stage with remain time > 180s to earn 3 stars
      Finish this stage with remain time > 90s to earn 2 stars`,
    },
  ],
};

const level10 = {
  levelNumber: 10,
  turnForFlipDown: 6,
  turnForRedirection: getRandomEvenTurns(8, 12),
  swap: swapHandler.swapLevel2,
  handleAfter2Flips: after2FlipsHandler.reduceTurnForFlipDownCount,
  sendShiftSignal: shiftSignalController.afterFlipShift,
  hint: `Each 2 times you flip the card, the cards will shift
  left or right 2 square. The shift direction will change after some 
  turns during the stage. After 6 consecutive incorrect flip, 
  the matched cards will be flip down each 2 turn.`,
  stages: [
    {
      stageNumber: 1,
      timeLimit: 420, //second
      _3starTimeRemain: 210, //second
      _2starTimeRemain: 120,
      reward: null,
      description: `Finish this stage with remain time > 210s to earn 3 stars
      Finish this stage with remain time > 120s to earn 2 stars`,
    },
    {
      stageNumber: 2,
      timeLimit: 360, //second
      _3starTimeRemain: 180, //second
      _2starTimeRemain: 120,
      reward: null,
      description: `Finish this stage with remain time > 180s to earn 3 stars
      Finish this stage with remain time > 120s to earn 2 stars`,
    },
    {
      stageNumber: 3,
      timeLimit: 300, //second
      _3starTimeRemain: 180, //second
      _2starTimeRemain: 90,
      reward: null,
      description: `Finish this stage with remain time > 180s to earn 3 stars
      Finish this stage with remain time > 90s to earn 2 stars`,
    },
  ],
};

export const levels = [level1, level2, level3, level4, level9, level10];
