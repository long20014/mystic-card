import { type } from './type';

const cardReducer = (state, action) => {
  switch (action.type) {
    case type.UPDATE_CARDS:
      return {
        ...state,
        cardArr: action.payload.cardArr,
      };
    case type.SET_GRID_SLOTS:
      return {
        ...state,
        gridSlots: action.payload.gridSlots,
      };
    case type.INIT_GAME:
      return {
        ...state,
        isInit: action.payload.isInit,
      };
    case type.SET_WAIT:
      return {
        ...state,
        isWaiting: action.payload.isWaiting,
      };
    case type.SET_WIN:
      return {
        ...state,
        isWinning: action.payload.isWinning,
      };
    case type.INCREASE_MOVE_COUNT: {
      return {
        ...state,
        moveCount: state.moveCount + 1,
      };
    }
    default:
      throw new Error('invalid action');
  }
};

export default cardReducer;
