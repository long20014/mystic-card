import CardGridService from 'services/card-grid.service';

const { swapMechanic, after2FlipsHandler, shiftSignalController } =
  CardGridService;

const level1 = {
  levelNumber: 1,
  swapMechanic: swapMechanic.swapLevel1,
  after2FlipsHandler: after2FlipsHandler.noHandler,
  shiftSignalController: shiftSignalController.shiftLevel1,
  stages: [
    {
      stageNumber: 1,
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      stageNumber: 2,
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      stageNumber: 3,
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      stageNumber: 4,
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      stageNumber: 5,
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
  ],
};

const level2 = {
  levelNumber: 2,
  swapMechanic: swapMechanic.swapLevel2,
  after2FlipsHandler: after2FlipsHandler.noHandler,
  shiftSignalController: shiftSignalController.shiftLevel2,
  stages: [
    {
      stageNumber: 1,
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      stageNumber: 2,
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      stageNumber: 3,
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      stageNumber: 4,
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      stageNumber: 5,
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
  ],
};

const level3 = {
  levelNumber: 3,
  swapMechanic: swapMechanic.swapLevel2,
  after2FlipsHandler: after2FlipsHandler.noHandler,
  shiftSignalController: shiftSignalController.shiftLevel3,
  stages: [
    {
      stageNumber: 1,
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      stageNumber: 2,
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      stageNumber: 3,
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      stageNumber: 4,
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      stageNumber: 5,
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
  ],
};

export const levels = [level1, level2, level3];
