import { combineReducers } from 'redux';
//import reducers
import action from './action';
import mypage from './mypage';
import videolist from './videolist';
import todayComplete from './todaycomplete';
import progress from './progress';

export default combineReducers({
  action,
  mypage,
  videolist,
  todayComplete,
  progress,
});
