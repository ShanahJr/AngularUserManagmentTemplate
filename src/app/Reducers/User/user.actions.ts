import { Action } from '@ngrx/store';

export const SET_USER_NAME = '[User] Set UserName';
export const SET_USER_ROLE = '[User] Set UserRole';

export class SetUserName implements Action {
  readonly type = SET_USER_NAME;
  constructor(public payload: string) {}
}

export class SetUserRole implements Action {
  readonly type = SET_USER_ROLE;
  constructor(public payload: string) {}
}

export type UserActions = SetUserName | SetUserRole;
