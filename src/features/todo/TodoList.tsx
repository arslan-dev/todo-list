import { useDispatch } from "react-redux"
import { useAppSelector } from "../../app/hooks"
import { todoRemoved, todoToggled } from "./todosSlice"

export default function TodoList() {
  const todoItems = useAppSelector(state => state.todos.items)
  const dispatch = useDispatch()

  if (todoItems.length === 0) {
    return <div className="mb-3">There are no items to display. Add new todos or change filter settings.</div>
  }

  const todoList = todoItems.map(todo => {
    const checkboxId = `checkbox-${todo.id}`

    return <li
      key={todo.id}
      className="list-group-item list-group-item-action"
    >
      <input
        type="checkbox"
        id={checkboxId}
        checked={todo.done}
        onChange={() => dispatch(todoToggled(todo.id))}
      />
      <label htmlFor={checkboxId}>{ todo.title }</label>
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

