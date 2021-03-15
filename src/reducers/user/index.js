import produce from 'immer';

import * as Types from './types';

export const INITIAL_STATE = {
  isAuthenticated: false,
  user: null,
  loading: false,
};

export default (state = INITIAL_STATE, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case Types.SIGNIN_REQUEST:
      case Types.SIGNUP_REQUEST:
      case Types.LOGOUT_REQUEST:
      case Types.UPDATE_PROFILE_REQUEST: {
        draft.loading = true;

        break;
      }
      case Types.SIGNIN_FAILURE:
      case Types.SIGNUP_FAILURE:
      case Types.LOGOUT_FAILURE:
      case Types.UPDATE_PROFILE_FAILURE: {
        draft.loading = false;

        break;
      }
      case Types.SIGNIN_SUCCESS:
      case Types.SIGNUP_SUCCESS:
      case Types.UPDATE_PROFILE_SUCCESS: {
        draft.loading = false;
        draft.isAuthenticated = true;
        draft.user = payload.user;

        break;
      }
      case Types.LOGOUT_SUCCESS: {
        draft = INITIAL_STATE;

        break;
      }

      default:
    }
  });
