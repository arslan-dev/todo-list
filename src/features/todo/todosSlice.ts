import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit"

type TTodo = {
  id: string,
  title: string
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
    todosAdded: {
      reducer(state, action: PayloadAction<TTodo>) {
        state.items.push(action.payload)
      },
      prepare(title: string) {
        return { payload: { id: nanoid(), title } }
      }
    }
  }
})

export default todosSlice.reducer
export const { todosAdded } = todosSlice.actions