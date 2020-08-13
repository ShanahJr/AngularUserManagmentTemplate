import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromUi from './Reducers/Ui/Ui.reducer';
import * as fromUser from './Reducers/User/User.reducer';

export interface State {
  Ui: fromUi.UiState;
  User: fromUser.UserState;
}

export const Reducers: ActionReducerMap<State> = {
  Ui: fromUi.UiReducer,
  User: fromUser.UserReducer,
};

//--------------- Ui Section -----------------------//
export const GetUiState = createFeatureSelector<fromUi.UiState>('Ui');
export const GetModal = createSelector(GetUiState, fromUi.GetModal);

//--------------- User Section -----------------------//
// export const GetUiState = createFeatureSelector<fromUi.UiState>("Ui");
// export const GetModal = createSelector(GetUiState , fromUi.GetModal);
