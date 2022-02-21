import CardGridService from 'services/card-grid.service';

const { swapMechanic, after2FlipsHandler, shiftSignalController } =
  CardGridService;

const level1 = {
  swapMechanic: swapMechanic.swapLevel1,
  after2FlipsHandler: after2FlipsHandler.noHandler,
  shiftSignalController: shiftSignalController.shiftLevel1,
  stages: [
    {
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
  ],
};

const level2 = {
  swapMechanic: swapMechanic.swapLevel2,
  after2FlipsHandler: after2FlipsHandler.noHandler,
  shiftSignalController: shiftSignalController.shiftLevel2,
  stages: [
    {
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
  ],
};

const level3 = {
  swapMechanic: swapMechanic.swapLevel2,
  after2FlipsHandler: after2FlipsHandler.noHandler,
  shiftSignalController: shiftSignalController.shiftLevel3,
  stages: [
    {
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
    {
      _3starTimeRemain: 100, //second
      _2starTimeRemain: 100,
      reward: null,
    },
  ],
};

export const level = [level1, level2, level3];
