import { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { todoAdded } from "./todosSlice";

export const MAX_TITLE_LENGTH=10

export default function AddTodoForm() {
  const [value, setValue] = useState('')
  const [lengthErrorGotTriggered, setLengthErrorGotTriggered] = useState(false)
  const dispatch = useDispatch()

  const lengthIsRight = value.length <= MAX_TITLE_LENGTH
  const thereIsVisibleLengthError = lengthErrorGotTriggered && !lengthIsRight

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    
    if (value.length===0) {
      return
    }

    if (!lengthIsRight) {
      setLengthErrorGotTriggered(true) 
    } else {
      setLengthErrorGotTriggered(false) 
      dispatch(todoAdded(value))
      setValue("")
    }
  }

  return (
    <form className="text-end" onSubmit={handleSubmit}>
      <div className="form-floating mb-3">
        <input
          type="text"
          id="newTodoTitle"
          className="form-control"
          placeholder="Feed the cat"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <label htmlFor="newTodoTitle">New Todo</label>
        {
          thereIsVisibleLengthError &&
          <div className="form-text text-danger">The title's length should not exceed ${MAX_TITLE_LENGTH} characters!</div>
        }
      </div>
      <button
        type="submit"
        className="btn btn-primary"
        disabled={value.length===0}
      >
        Add
      </button>
    </form>
  )
}