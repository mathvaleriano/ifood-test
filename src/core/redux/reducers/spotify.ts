import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as service from 'core/services/spotify'
import Playlist from 'types/spotify';
import { AppThunk, Dispatch } from '..'

type Errors = {
  getItems?: string,
}

type Loadings = {
  getItems: boolean,
}

type State = {
  isLogged: boolean,
  errors: Errors,
  items: Playlist[],
  loadings: Loadings,
}

const initialState: State = {
  isLogged: false,
  errors: {},
  items: [],
  loadings: {
    getItems: false,
  },
}

const { actions, reducer } = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setItems: (state, { payload = [] }: PayloadAction<Playlist[]>) => {
      state.items = payload
    },
    setError: (state, { payload }: PayloadAction<{ key: keyof Errors, value: string }>) => {
      state.errors[payload.key] = payload.value
    },
    toggleLoading: (state, { payload }: PayloadAction<{ key: keyof Loadings, value: boolean }>) => {
      state.loadings[payload.key] = payload.value
    },
  }
})

export const {
  setError,
  setItems,
  toggleLoading
} = actions

export const get = (filters: Record<string, string> = {}): AppThunk => (
  async (dispatch: Dispatch) => {
    try {
      dispatch(toggleLoading({ key: 'getItems', value: true }))
      const { playlists } = await service.get(filters)
      dispatch(setItems(playlists.items))
    } catch (error) {
      if (error.status === 401) {
        service.clearToken()
        service.login()
      }
      dispatch(setError({ key: 'getItems', value: error.message }))
    } finally {
      dispatch(toggleLoading({ key: 'getItems', value: false }))
    }
  }
)

export default reducer