import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import renderWithProviders from '../../utils/test-utils'
import Todo from './Todo'

afterEach(() => cleanup())

describe('Todo C integration tests', () => {
  it("should add new todo", () => {
    renderWithProviders(<Todo />) 
    const $input = screen.getByLabelText('New Todo')
    fireEvent.change($input, { target: { value: 'Alpha' }})
    const $submit = screen.getByText('Add')
    fireEvent.click($submit)

    expect(screen.queryByText('Alpha')).toBeInTheDocument()
  })

  it("should not add todo with an empty title", () => {
    renderWithProviders(<Todo />) 

    const $submit = screen.getByText('Add')
    expect ($submit).toBeDisabled()

    fireEvent.click($submit)
    expect(screen.queryByText(/no items to display/i)).toBeInTheDocument()
  })
})