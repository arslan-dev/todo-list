import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";

export default function Todo() {
  return (
    <main className="row">
      <div className="col">
        <section>
          Filter
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