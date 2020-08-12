import { handleActions } from 'redux-actions';

import axios from 'axios';

const GET_LIST_PENDING = 'GET_LIST_PENDING';
const GET_LIST_SUCCESS = 'GET_LIST_SUCCESS';
const GET_LIST_FAILURE = 'GET_LIST_FAILURE';

function getvideoAPI() {
  return axios.get('http://localhost:3000/mypage/getvideolist', {
    withCredentials: true,
  });
}

const initialState = {
  pending: false,
  error: false,
  data: [],
};

export const getvideoList = () => (dispatch) => {
  dispatch({ type: GET_LIST_PENDING });

  return getvideoAPI()
    .then((result) => {
      dispatch({
        type: GET_LIST_SUCCESS,
        payload: result.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: GET_LIST_FAILURE,
        payload: error,
      });
    });
};

export default handleActions(
  {
    [GET_LIST_PENDING]: (state, action) => {
      return {
        ...state,
        pending: true,
        error: false,
      };
    },
    [GET_LIST_SUCCESS]: (state, action) => {
      return {
        ...state,
        pending: false,
        data: action.payload,
      };
    },
    [GET_LIST_FAILURE]: (state, action) => {
      return {
        ...state,
        pending: false,
        error: true,
      };
    },
  },
  initialState,
);
