import { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { todosAdded } from "./todosSlice";

export default function AddTodoForm() {
  const [value, setValue] = useState('')
  const dispatch = useDispatch()

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault()
    
    if (value.length===0) {
      return
    }

    dispatch(todosAdded(value))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="newTodoTitle">New Todo</label>
      <input
        type="text"
        id="newTodoTitle"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
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