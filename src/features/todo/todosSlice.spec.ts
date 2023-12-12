import { describe, expect, it } from 'vitest'
import todosReducer, { TTodosState, todosAdded } from './todosSlice'

describe("CRUD todos", () => {
  const initialState: TTodosState = {
    items: []
  }

  it("should return initial state", () => {
    expect( todosReducer( undefined, { type: "" })).toEqual(initialState)
  })

  it("should add new todo", () => {
    const todosState = todosReducer(initialState, todosAdded('Alpha'))
    expect(todosState.items).toHaveLength(1)
    expect(todosState.items[0].title).toStrictEqual('Alpha')
  })
})