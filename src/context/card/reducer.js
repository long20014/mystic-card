import { type } from './type';
import CardGridService from 'services/card-grid.service';

const { initCardArray } = CardGridService;

const cardReducer = (state, action) => {
  // console.log(action.type);
  switch (action.type) {
    case type.UPDATE_CARDS:
      return {
        ...state,
        cardArr: action.payload.cardArr,
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
    case type.INCREASE_MATCH_COUNT: {
      return {
        ...state,
        matchCount: state.matchCount + 1,
      };
    }
    case type.DECREASE_MATCH_COUNT: {
      return {
        ...state,
        matchCount: state.matchCount > 0 ? state.matchCount - 1 : 0,
      };
    }
    case type.RESTART_GAME: {
      return {
        ...state,
        cardArr: initCardArray(),
        matchCount: 0,
        moveCount: 0,
        isWinning: false,
        isInit: false,
      };
    }
    case type.SET_GO_SHIFT: {
      return {
        ...state,
        goShift: action.payload.goShift,
      };
    }
    case type.SET_GAME_LEVEL: {
      const level = action.payload.level;
      return {
        ...state,
        cardArr: initCardArray(),
        matchCount: 0,
        moveCount: 0,
        isWinning: false,
        isInit: false,
        gameLevel: {
          ...level,
        },
      };
    }
    case type.SET_DIRECTION: {
      return {
        ...state,
        gameLevel: {
          ...state.gameLevel,
          direction: action.payload.direction,
        },
      };
    }
    case type.SET_SCORE_BOARD: {
      return {
        ...state,
        scoreBoard: { ...action.payload.scoreBoard },
      };
    }
    case type.SET_TIME_REMAIN: {
      return {
        ...state,
        gameLevel: {
          ...state.gameLevel,
          timeRemain: action.payload.timeRemain,
        },
      };
    }
    case type.SAVE_SCORE: {
      return {
        ...state,
        scoreBoard: {
          ...state.scoreBoard,
          [action.payload.stageName]: {
            stageName: action.payload.stageName,
            levelNumber: action.payload.levelNumber,
            stageNumber: action.payload.stageNumber,
            star: action.payload.star,
            bestTime: action.payload.bestTime,
          },
        },
      };
    }
    case type.SET_TURN_FOR_FLIP_DOWN_COUNT: {
      return {
        ...state,
        gameLevel: {
          ...state.gameLevel,
          turnForFlipDownCount: action.payload.count,
        },
      };
    }
    default:
      throw new Error('invalid action');
  }
};

export default cardReducer;
