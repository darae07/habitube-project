import { handleActions } from 'redux-actions';

import axios from 'axios';

const GET_BOXES_PENDING = 'GET_BOXES_PENDING';
const GET_BOXES_SUCCESS = 'GET_BOXES_SUCCESS';
const GET_BOXES_FAILURE = 'GET_BOXES_FAILURE';

function mypageAPI() {
  return axios.get('http://localhost:3000/mypage', { withCredentials: true });
}

const initialState = {
  pending: false,
  error: false,
  data: [],
};

export const getMypage = () => (dispatch) => {
  dispatch({ type: GET_BOXES_PENDING });

  return mypageAPI()
    .then((result) => {
      dispatch({
        type: GET_BOXES_SUCCESS,
        payload: result.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_BOXES_FAILURE,
        payload: error,
      });
    });
};

export default handleActions(
  {
    [GET_BOXES_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_BOXES_SUCCESS]: (state, action) => {
      return {
        ...state,
        pending: false,
        data: action.payload,
      };
    },
    [GET_BOXES_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState,
);
