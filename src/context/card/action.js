import { type } from './type';

export const flipUp = (dispatch, cardArr) =>
  dispatch({
    type: type.FLIP_UP,
    payload: cardArr,
  });

export const setGridSlots = (dispatch, gridSlots) =>
  dispatch({
    type: type.SET_GRID_SLOTS,
    payload: gridSlots,
  });

export const initGame = (dispatch, isInit) =>
  dispatch({
    type: type.INIT_GAME,
    payload: isInit,
  });