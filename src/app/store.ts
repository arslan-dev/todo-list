import { combineReducers, configureStore } from '@reduxjs/toolkit'
import todos from '../features/todo/todosSlice'

const reducer = combineReducers({ todos })

export function setupStore(preloadedState?: RootState) {
  return configureStore({ reducer, preloadedState })
}

export type RootState = ReturnType<typeof reducer>
export type AppStore = ReturnType<typeof setupStore>