// counterActions.ts
import {createAction} from '@reduxjs/toolkit';

export const setIsAuth = createAction<boolean>('auth/setIsAuth');
export const setAccessToken = createAction<string>('auth/setAccessToken');
export const setRefreshToken = createAction<string>('auth/setRefreshToken');
