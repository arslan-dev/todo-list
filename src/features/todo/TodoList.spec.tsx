import '@testing-library/jest-dom/vitest'
import { cleanup, screen } from '@testing-library/react'
import { afterEach, describe, expect, test, it } from 'vitest'
import renderWithProviders from '../../utils/test-utils'
import TodoList from './TodoList'
import { RootState } from '../../app/store'

afterEach(() => cleanup())

describe('TodoList specs', () => {
  const stateWithTwoTodos: RootState = {
    todos: {
      items: [
        { id:"1", title: "Alpha"},
        { id:"2", title: "Bravo"},
      ]
    }
  }

  test("Initially the list should be empty", () => {
    renderWithProviders(<TodoList />)
    expect(screen.queryByText(/no items to display/i)).toBeInTheDocument()
  })

  it('should display items correctly', () => { 
    renderWithProviders(<TodoList />, { preloadedState: stateWithTwoTodos })
    expect(screen.queryByText(/Alpha/i)).toBeInTheDocument()
    expect(screen.queryByText(/Bravo/i)).toBeInTheDocument()
  })
})