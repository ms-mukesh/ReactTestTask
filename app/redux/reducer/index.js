import {combineReducers} from 'redux';
import {RESET_STORE} from '../types';
import {appDefaultReducer} from './defaultReducer';
import appDefaultSettingReducer from './appReducer';
const appReducer = combineReducers({
  appDefaultSettingReducer,
});
export default function rootReducer(state, action) {
  let finalState = appReducer(state, action);
  if (action.type === RESET_STORE) {
    finalState = appDefaultReducer;
  }
  return finalState;
}
