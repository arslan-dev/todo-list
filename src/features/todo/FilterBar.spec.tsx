import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, getByText, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import renderWithProviders from '../../utils/test-utils'
import { RootState } from '../../app/store'
import Todo from './Todo'
import { EFilterValue } from './todosSlice'

afterEach(() => cleanup())

describe("Filter bar tests", () => {
  const stateWithThreeTodos: RootState = {
    todos: {
      items: [
        {id: "1", title: "Alpha", done: true},
        {id: "2", title: "Bravo", done: false},
        {id: "3", title: "Charlie", done: false},
      ],
      filterValue: EFilterValue.All
    }
  }

  it("should filter todos correctly", () => {
    renderWithProviders(<Todo />, { preloadedState: stateWithThreeTodos }) 
    const $filterSelect = screen.getByLabelText("Filter")
    fireEvent.change($filterSelect, { target: { value: "Filtered" }})
    expect( $filterSelect ).toHaveValue("Filtered")

    expect( screen.queryByText("Alpha")).toBeInTheDocument()
    expect( screen.queryByText("Bravo")).not.toBeInTheDocument()
    expect( screen.queryByText("Charlie")).not.toBeInTheDocument()

    fireEvent.change($filterSelect, { target: { value: "Unfiltered" }})
    expect( $filterSelect ).toHaveValue("Unfiltered")

    expect( screen.queryByText("Alpha")).not.toBeInTheDocument()
    expect( screen.queryByText("Bravo")).toBeInTheDocument()
    expect( screen.queryByText("Charlie")).toBeInTheDocument()
  })

  it("should filter todos correctly after toggling items", () => {
    renderWithProviders(<Todo />, { preloadedState: stateWithThreeTodos }) 
    const $checkbox = screen.getByLabelText(/Bravo/i)
    fireEvent.click($checkbox)

    const $filterSelect = screen.getByLabelText("Filter")
    fireEvent.change($filterSelect, { target: { value: "Filtered" }})

    expect( screen.queryByText("Alpha")).toBeInTheDocument()
    expect( screen.queryByText("Bravo")).toBeInTheDocument()
    expect( screen.queryByText("Charlie")).not.toBeInTheDocument()
  })

  it("should filter todos correctly after deleting items", () => {
    renderWithProviders(<Todo />, { preloadedState: stateWithThreeTodos }) 
    const $checkbox = screen.getByLabelText(/Alpha/i)
    const $delBtn = getByText( $checkbox.parentElement!, "Delete" )

    fireEvent.click($delBtn)
    const $filterSelect = screen.getByLabelText("Filter")
    fireEvent.change($filterSelect, { target: { value: "Filtered" }})

    expect( screen.queryByText("Alpha")).not.toBeInTheDocument()
    expect( screen.queryByText("Bravo")).not.toBeInTheDocument()
    expect( screen.queryByText("Charlie")).not.toBeInTheDocument()
  })
})