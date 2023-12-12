import { useDispatch } from "react-redux"
import { useAppSelector } from "../../app/hooks"
import { selectFiltered, todoRemoved, todoToggled } from "./todosSlice"

export default function TodoList() {
  const todoItems = useAppSelector(selectFiltered)
  const dispatch = useDispatch()

  if (todoItems.length === 0) {
    return <div className="mb-3">There are no items to display. Add new todos or change filter settings.</div>
  }

  const todoList = todoItems.map(todo => {
    const checkboxId = `checkbox-${todo.id}`

    return <li
      key={todo.id}
      className="list-group-item list-group-item-action d-flex align-items-center justify-content-between"
    >
      <input
        type="checkbox"
        className="form-check-input me-2"
        id={checkboxId}
        checked={todo.done}
        onChange={() => dispatch(todoToggled(todo.id))}
      />

      <label
        htmlFor={checkboxId}
        className="form-check-label flex-grow-1"
      >
        { todo.title }
      </label>

      <button
        type="button"
        className="btn btn-danger"
        onClick={() => dispatch(todoRemoved(todo.id))}
      >
        Delete
      </button>
    </li>
  })

  return <ul className="list-group mb-3">{ todoList }</ul>
}

