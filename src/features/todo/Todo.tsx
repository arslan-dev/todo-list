import AddTodoForm from "./AddTodoForm";
import FilterBar from "./FilterBar";
import TodoList from "./TodoList";

export default function Todo() {
  return (
    <main className="row">
      <div className="col">
        <section>
          <FilterBar />
        </section>
        <article>
          <TodoList />
        </article>
        <section>
          <AddTodoForm />
        </section> 
      </div>
    </main>
  )
}