import { type } from './type';

const cardReducer = (state, action) => {
  switch (action.type) {
  case type.FLIP_UP:
    return {
      ...state,
      cardArr: action.payload,
    };
  case type.SET_GRID_SLOTS:
    return {
      ...state,
      gridSlots: action.payload,
    };
  case type.INIT_GAME:
    return {
      ...state,
      isInit: action.payload,
    };
  default:
    return state;
  }
};

export default cardReducer;
