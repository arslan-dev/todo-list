import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit"

type TTodo = {
  id: string,
  title: string,
  done: boolean
}

export type TTodosState = {
  items: TTodo[]
}

const initialState: TTodosState = {
  items: []
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
    }
  }
})

export default todosSlice.reducer
export const { todoAdded, todoRemoved, todoToggled } = todosSlice.actions