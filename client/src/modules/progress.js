import { handleActions } from 'redux-actions';

import axios from 'axios';

const GET_PROGRESS_PENDING = 'GET_PROGRESS_PENDING';
const GET_PROGRESS_SUCCESS = 'GET_PROGRESS_SUCCESS';
const GET_PROGRESS_FAILURE = 'GET_PROGRESS_FAILURE';

function progressAPI() {
  return axios.get('http://localhost:3000/mypage/progress', {
    withCredentials: true,
  });
}

const initialState = {
  pending: false,
  error: false,
  data: [],
};

export const getProgress = () => (dispatch) => {
  dispatch({ type: GET_PROGRESS_PENDING });

  return progressAPI()
    .then((result) => {
      dispatch({
        type: GET_PROGRESS_SUCCESS,
        payload: result.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_PROGRESS_FAILURE,
        payload: error,
      });
    });
};

export default handleActions(
  {
    [GET_PROGRESS_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_PROGRESS_SUCCESS]: (state, action) => {
      return {
        ...state,
        pending: false,
        data: action.payload,
      };
    },
    [GET_PROGRESS_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState,
);
