import { Action } from '@ngrx/store';

import { UserActions, SET_USER_NAME, SET_USER_ROLE } from './user.actions';

export interface UserState {
  UserName: string;
  UserRole: string;
}

const initialState: UserState = {
  UserName: '',
  UserRole: '',
};

export function UserReducer(state = initialState, action: UserActions) {
  switch (action.type) {
    case SET_USER_NAME:
      return {
        ...state,
        UserName: action.payload,
      };
    case SET_USER_ROLE:
      return {
        ...state,
        UserRole: action.payload,
      };
    default: {
      return state;
    }
  }
}

export const GetUserName = (state: UserState) => state.UserName;
export const GetUserRole = (state: UserState) => state.UserRole;
