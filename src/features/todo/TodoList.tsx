import { useAppSelector } from "../../app/hooks"

export default function TodoList() {
  const todoItems = useAppSelector(state => state.todos.items)

  if (todoItems.length === 0) {
    return <div className="mb-3">There are no items to display. Add new todos or change filter settings.</div>
  }

  const todoList = todoItems.map(todo => {
    return <li
      key={todo.id}
      className="list-group-item list-group-item-action"
    >
      { todo.title }
    </li>
  })

  return <ul className="list-group">{ todoList }</ul>
}

