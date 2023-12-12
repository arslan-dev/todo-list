import { PayloadAction, createSelector, createSlice, nanoid } from "@reduxjs/toolkit"
import { type RootState } from "../../app/store"

export enum EFilterValue {
  All = "All",
  Filtered = "Filtered",
  Unfiltered = "Unfiltered"
}

type TTodo = {
  id: string,
  title: string,
  done: boolean
}

export type TTodosState = {
  items: TTodo[],
  filterValue: EFilterValue
}

const initialState: TTodosState = {
  items: [],
  filterValue: EFilterValue.All
}

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded: {
      reducer(state, action: PayloadAction<TTodo>) {
        state.items.push(action.payload)
      },
      prepare(title: string) {
        return { payload: { id: nanoid(), title, done: false } }
      }
    },
    todoToggled(state, action: PayloadAction<string>) {
      const todo = state.items.find(todo => todo.id === action.payload)
      if (todo) {
        todo.done = !todo.done
      }
    },
    todoRemoved(state, action: PayloadAction<string>) {
      state.items = state.items.filter(todo => todo.id !== action.payload)
    },

    filterValueSet(state, action: PayloadAction<EFilterValue>) {
      state.filterValue = action.payload
    }
  }
})

export const selectFiltered = createSelector([
  (state: RootState) => state.todos.items,
  (state: RootState) => state.todos.filterValue
],
(list, filterValue) => {
  if (filterValue === EFilterValue.Filtered || filterValue === EFilterValue.Unfiltered) {
    const filterCriteria = filterValue === EFilterValue.Filtered
    return list.filter(todo => todo.done === filterCriteria)
  } else {
    return [...list]
  }
})


export default todosSlice.reducer
export const { todoAdded, todoRemoved, todoToggled, filterValueSet } = todosSlice.actions