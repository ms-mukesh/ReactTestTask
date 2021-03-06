import {LOADING, SET_USER_LIST} from '../types/index';
import {appDefaultReducer} from './defaultReducer';
const INITIAL_STATE = appDefaultReducer.AppDefaultSettings;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case SET_USER_LIST: {
      return {
        ...state,
        userList: action.payload,
      };
    }
    default:
      return state;
  }
};
