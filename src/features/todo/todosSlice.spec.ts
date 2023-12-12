import { describe, expect, it } from 'vitest'
import todosReducer, { EFilterValue, TTodosState, filterValueSet, selectFiltered, todoAdded, todoRemoved, todoToggled } from './todosSlice'

describe("CR todos", () => {
  const initialState: TTodosState = {
    items: [],
    filterValue: EFilterValue.All
  }

  it("should return initial state", () => {
    expect( todosReducer( undefined, { type: "" })).toEqual(initialState)
  })

  it("should add new todo", () => {
    const actualState = todosReducer(initialState, todoAdded('Alpha'))
    expect(actualState.items).toHaveLength(1)
    expect(actualState.items[0].title).toStrictEqual('Alpha')
  })
})

describe("UD todos", () => {
  const stateWithTwoTodos: TTodosState = {
    items: [
      {id: "1", title: "Alpha", done: false},
      {id: "2", title: "Bravo", done: false},
    ],
    filterValue: EFilterValue.All
  }

  it("should toggle todos", () => {
    const actualState = todosReducer(stateWithTwoTodos, todoToggled("1"))
    expect(actualState.items).toHaveLength(2)
    const todo1 = actualState.items.find(todo => todo.id === "1")!
    const todo2 = actualState.items.find(todo => todo.id === "2")!
    expect(todo1.done).toStrictEqual(true)
    expect(todo2.done).toStrictEqual(false)
  })

  it("should remove todos", () => {
    const actualState = todosReducer(stateWithTwoTodos, todoRemoved("1"))
    expect(actualState.items).toHaveLength(1)
    expect(actualState.items[0].title).toStrictEqual('Bravo')
  })
})

describe("Filter todos", () => {
  const stateWithThreeTodos: TTodosState = {
    items: [
      {id: "1", title: "Alpha", done: true},
      {id: "2", title: "Bravo", done: false},
      {id: "3", title: "Charlie", done: false},
    ],
    filterValue: EFilterValue.All
  }

  it("should display filtered todos", () => {
    let actualState = todosReducer(stateWithThreeTodos, filterValueSet(EFilterValue.Filtered))
    expect( actualState.filterValue ).toStrictEqual( EFilterValue.Filtered )

    let actualFilteredItems = selectFiltered({ todos: actualState })
    expect( actualFilteredItems ).toHaveLength(1)
    expect( actualFilteredItems[0].title).toStrictEqual( 'Alpha' )

    actualState = todosReducer(actualState, filterValueSet(EFilterValue.Unfiltered))
    expect( actualState.filterValue ).toStrictEqual( EFilterValue.Unfiltered )

    actualFilteredItems = selectFiltered({ todos: actualState })
    expect( actualFilteredItems ).toHaveLength(2)
    expect( actualFilteredItems[0].title).not.toStrictEqual( 'Alpha' )
    expect( actualFilteredItems[1].title).not.toStrictEqual( 'Alpha' )
  })
})