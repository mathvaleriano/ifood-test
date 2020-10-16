import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as service from 'core/services/filters'
import Filter from 'types/filters';
import { AppThunk, Dispatch } from '..'

type State = {
  error: string,
  items: Filter[],
  loading: boolean
}

const initialState: State = {
  error: '',
  items: [],
  loading: false,
}

const { actions, reducer } = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setItems: (state, { payload }: PayloadAction<Filter[]>) => {
      state.items = payload
    },
    setError: (state, { payload = '' }: PayloadAction<string>) => {
      state.error = payload
    },
    toggleLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload
    },
  }
})

export const {
  setError,
  setItems,
  toggleLoading
} = actions

export const get = (): AppThunk => (
  async (dispatch: Dispatch) => {
    try {
      dispatch(toggleLoading(true))
      const { filters } = await service.get()
      dispatch(setItems(filters))
    } catch (error) {
      dispatch(setError(error.message))
    } finally {
      dispatch(toggleLoading(false))
    }
  }
)

export default reducer