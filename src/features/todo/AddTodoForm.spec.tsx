import '@testing-library/jest-dom/vitest'
import { cleanup, fireEvent, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import renderWithProviders from '../../utils/test-utils'
import AddTodoForm from './AddTodoForm'

afterEach(() => cleanup())

describe("Title length validation", () => {
  test("Initially there should never be any error messages, even after adding new characters", () => {
    renderWithProviders(<AddTodoForm />)
    expect( screen.queryByText(/title should not exceed/i)).not.toBeInTheDocument()
    const $titleInput = screen.getByLabelText(/New Todo/i)

    fireEvent.change($titleInput, { target: { value: "1234567890"}})
    expect( screen.queryByText(/title should not exceed/i)).not.toBeInTheDocument()

    fireEvent.change($titleInput, { target: { value: "12345678900000"}})
    expect( screen.queryByText(/title should not exceed/i)).not.toBeInTheDocument()
  })

  test(`1. In case of new title consisting more than 10 characters 
        it should display error message the moment we press the Add button;
        2. after we bring the amount to LTE of 10 characters
        the error must vanish without pressing the button;
        3. after adding GT of 10 characters again the the message must manifest again`, () => {
    renderWithProviders(<AddTodoForm />)
    const $titleInput = screen.getByLabelText(/New Todo/i)
    const $submitBtn = screen.getByText(/add/i)

    fireEvent.change($titleInput, { target: { value: "12345678900000"}})
    fireEvent.click($submitBtn)
    expect( screen.queryByText(/title's length should not exceed/i)).toBeInTheDocument()
  })
})