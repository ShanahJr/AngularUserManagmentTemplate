import { Action } from '@ngrx/store';
import { ModalModel } from '../../Models/Modal/modal-model';

export const SET_MODAL = '[Ui] Set Model';
//export const SET_USER_ROLE = '[User] Set UserRole';

export class SetModel implements Action {
  readonly type = SET_MODAL;
  constructor(public payload: ModalModel) {}
}

// export class SetUserRole implements Action {
//   readonly type = SET_USER_ROLE;
//   constructor(public payload: string) {}
// }

export type UiActions = SetModel;
