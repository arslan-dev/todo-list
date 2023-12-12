import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type TTodo = {
  title: string
}

export type TTodosState = {
  todoItems: TTodo[]
}

const initialState: TTodosState = {
  todoItems: []
}

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todosAdded: {
      reducer(state, action: PayloadAction<TTodo>) {
        state.todoItems.push(action.payload)
      },
      prepare(title: string) {
        return { payload: { title } }
      }
    }
  }
})

export default todosSlice.reducer
export const { todosAdded } = todosSlice.actions