import * as Types from './types';

export const loginRequest = ({ email, password }) => ({
  type: Types.SIGNIN_REQUEST,
  payload: {
    email,
    password,
  },
});

export const loginSuccess = (user) => ({
  type: Types.SIGNIN_SUCCESS,
  payload: {
    user,
  },
});

export const loginFailure = (error) => ({
  type: Types.SIGNIN_FAILURE,
  payload: {
    error,
  },
});

export const registerRequest = (payload) => ({
  type: Types.SIGNUP_REQUEST,
  payload,
});

export const registerSuccess = (user) => ({
  type: Types.SIGNUP_SUCCESS,
  payload: {
    user,
  },
});

export const registerFailure = (error) => ({
  type: Types.SIGNUP_FAILURE,
  payload: {
    error,
  },
});

export const updateRequest = (payload) => ({
  type: Types.UPDATE_PROFILE_REQUEST,
  payload,
});

export const updateSuccess = (user) => ({
  type: Types.UPDATE_PROFILE_SUCCESS,
  payload: {
    user,
  },
});

export const updateFailure = (error) => ({
  type: Types.UPDATE_PROFILE_FAILURE,
  payload: {
    error,
  },
});

export const logoutRequest = () => ({
  type: Types.LOGOUT_REQUEST,
});

export const logoutSuccess = () => ({
  type: Types.LOGOUT_SUCCESS,
});

export const logoutFailure = (error) => ({
  type: Types.LOGOUT_FAILURE,
  payload: {
    error,
  },
});
