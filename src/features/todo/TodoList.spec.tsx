import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, getByText, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, it } from 'vitest'
import renderWithProviders from '../../utils/test-utils'
import TodoList from './TodoList'
import { RootState } from '../../app/store'
import { EFilterValue } from './todosSlice'

afterEach(() => cleanup())

describe('TodoList RD integration tests', () => {
  const stateWithTwoTodos: RootState = {
    todos: {
      items: [
        { id:"1", title: "Alpha", done: false},
        { id:"2", title: "Bravo", done: false},
      ],
      filterValue: EFilterValue.All
    }
  }

  test("Initially the list should be empty", () => {
    renderWithProviders(<TodoList />)
    expect( screen.queryByText(/no items to display/i)).toBeInTheDocument()
  })

  it('should display items correctly', () => { 
    renderWithProviders(<TodoList />, { preloadedState: stateWithTwoTodos })
    expect( screen.queryByText(/Alpha/i) ).toBeInTheDocument()
    expect( screen.queryByText(/Bravo/i) ).toBeInTheDocument()
  })

  it('should toggle the todo', () => {
    renderWithProviders(<TodoList />, { preloadedState: stateWithTwoTodos })
    const $checkbox = screen.getByLabelText(/Alpha/i)
    expect( $checkbox ).not.toBeChecked()

    fireEvent.click($checkbox)
    expect( $checkbox ).toBeChecked()

    fireEvent.click($checkbox)
    expect( $checkbox ).not.toBeChecked()
  })

  it("should delete the todo", () => {
    renderWithProviders(<TodoList />, { preloadedState: stateWithTwoTodos })
    const $checkbox = screen.getByLabelText(/Alpha/i)
    const $delBtn = getByText( $checkbox.parentElement!, "Delete" )

    fireEvent.click($delBtn)
    expect( screen.queryByText(/Alpha/i) ).not.toBeInTheDocument()
    expect( screen.queryByText(/Bravo/i) ).toBeInTheDocument()
  })
})