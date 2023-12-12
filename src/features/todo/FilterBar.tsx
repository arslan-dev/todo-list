import { useDispatch } from "react-redux"
import { useAppSelector } from "../../app/hooks"
import { EFilterValue, filterValueSet } from "./todosSlice"

export default function FilterBar() {
  const dispatch = useDispatch()
  const filterValue = useAppSelector(state => state.todos.filterValue)

  return (
    <div>
      <label htmlFor="filterSelect">Filter</label>
      <select
        id="filterSelect"
        value={filterValue}
        onChange={e => dispatch( filterValueSet(e.target.value as EFilterValue))}
      >
        <option value="All">All</option>
        <option value="Filtered">All</option>
        <option value="Unfiltered">All</option>
      </select>
    </div>
  )
}