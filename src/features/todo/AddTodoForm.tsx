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
    setValue("")
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