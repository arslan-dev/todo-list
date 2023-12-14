import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, getByText, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import renderWithProviders from '../../utils/test-utils'
import { RootState } from '../../app/store'
import Todo from './Todo'
import { EFilterValue } from './todosSlice'
import FilterBar from './FilterBar'

afterEach(() => cleanup())

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

describe("Filter bar tests", () => {
  it("should filter todos correctly", () => {
    renderWithProviders(<Todo />, { preloadedState: stateWithThreeTodos }) 
    const $filterSelect = screen.getByLabelText("Filter")
    fireEvent.change($filterSelect, { target: { value: "Finished" }})
    expect( $filterSelect ).toHaveValue("Finished")

    expect( screen.queryByText("Alpha")).toBeInTheDocument()
    expect( screen.queryByText("Bravo")).not.toBeInTheDocument()
    expect( screen.queryByText("Charlie")).not.toBeInTheDocument()

    fireEvent.change($filterSelect, { target: { value: "Unfinished" }})
    expect( $filterSelect ).toHaveValue("Unfinished")

    expect( screen.queryByText("Alpha")).not.toBeInTheDocument()
    expect( screen.queryByText("Bravo")).toBeInTheDocument()
    expect( screen.queryByText("Charlie")).toBeInTheDocument()
  })

  it("should filter todos correctly after toggling items", () => {
    renderWithProviders(<Todo />, { preloadedState: stateWithThreeTodos }) 
    const $checkbox = screen.getByLabelText(/Bravo/i)
    fireEvent.click($checkbox)

    const $filterSelect = screen.getByLabelText("Filter")
    fireEvent.change($filterSelect, { target: { value: "Finished" }})

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
    fireEvent.change($filterSelect, { target: { value: "Finished" }})

    expect( screen.queryByText("Alpha")).not.toBeInTheDocument()
    expect( screen.queryByText("Bravo")).not.toBeInTheDocument()
    expect( screen.queryByText("Charlie")).not.toBeInTheDocument()
  })
})

describe("Counter tests", () => {
  it("should count correctly initially", () => {
    renderWithProviders(<FilterBar />, { preloadedState: stateWithThreeTodos })    
    expect( screen. queryByText("1 done / 2 todo")).toBeInTheDocument()
  })

  it("should not change after applying filter", () => {
    renderWithProviders(<FilterBar />, { preloadedState: stateWithThreeTodos })    
    const $filterSelect = screen.getByLabelText("Filter")
    fireEvent.change($filterSelect, { target: { value: "Finished" }})

    expect( screen.queryByText("1 done / 2 todo")).toBeInTheDocument()
  })
  
  it("should count correctly after toggling items", () => {
    renderWithProviders(<Todo />, { preloadedState: stateWithThreeTodos })    
    const $checkbox = screen.getByLabelText(/Bravo/i)
    fireEvent.click($checkbox)

    expect( screen.queryByText("2 done / 1 todo")).toBeInTheDocument()
  })

  it("should count correctly after deleting items", () => {
    renderWithProviders(<Todo />, { preloadedState: stateWithThreeTodos })    
    const $checkbox = screen.getByLabelText(/Bravo/i)
    const $delBtn = getByText($checkbox.parentElement!, "Delete")
    fireEvent.click($delBtn)
    expect( screen.queryByText("1 done / 1 todo")).toBeInTheDocument()
  })
})