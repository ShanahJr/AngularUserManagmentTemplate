import { Action } from '@ngrx/store';
import { ModalModel } from '../../Models/Modal/modal-model';

import { UiActions, SET_MODAL } from './ui.actions';

export interface UiState {
  Modal: ModalModel;
  //UserRole: string;
}

const initialState: UiState = {
  Modal: null,
  //UserRole: '',
};

export function UiReducer(state = initialState, action: UiActions) {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        Modal: action.payload,
      };
    // case SET_USER_ROLE:
    //   return {
    //     ...state,
    //     UserRole: action.payload,
    //   };
    default: {
      return state;
    }
  }
}

export const GetModal = (state: UiState) => state.Modal;
//export const GetUserRole = (state: State) => state.UserRole;
