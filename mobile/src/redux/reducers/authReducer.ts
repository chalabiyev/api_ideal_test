// authReducer.ts
import {createReducer} from '@reduxjs/toolkit';
import {
  setAccessToken,
  setIsAuth,
  setRefreshToken,
  setUserId,
} from '../actions/authAction';

const initialState = {
  count: 0,
  isAuth: false,
  accessToken: '',
  refreshToken: '',
  userId: '',
  theatreId: '',
  theatreName: '',
  language: 'az',
};

const authReducer = createReducer(initialState, builder => {
  builder
    .addCase(setIsAuth, (state, action) => ({
      ...state,
      isAuth: action.payload,
    }))
    .addCase(setAccessToken, (state, action) => ({
      ...state,
      accessToken: action.payload,
    }))
    .addCase(setRefreshToken, (state, action) => ({
      ...state,
      refreshToken: action.payload,
    }));
});

export default authReducer;
