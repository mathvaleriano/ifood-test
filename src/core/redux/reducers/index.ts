
import { combineReducers } from '@reduxjs/toolkit'
import filterReducers from './filters'
import spotifyReducers from './spotify'

const rootReducer = combineReducers({
  filters: filterReducers,
  spotify: spotifyReducers
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer