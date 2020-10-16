import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk'
import rootReducer, { RootState } from './reducers'

const store = configureStore({
  reducer: rootReducer,
});

export type Dispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store
