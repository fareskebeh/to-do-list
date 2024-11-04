function Todo({ title, id, date, deleteTodo, isDone, toggleDone }) {
  return (
    <div className={`todo ${isDone?"todo-done":""}`}>
      <div>
        <div className="checkbox-body">
          <input className="my-checkbox" id={`checkbox-${id}`} type="checkbox" checked={isDone} onChange={() => toggleDone(id)} />
          <label htmlFor={`checkbox-${id}`}></label>
        </div>
        <h3 className={isDone ? "done" : "pending"}>{title}</h3>
      </div>
      <p id="date-created">{date}</p>
      <button onClick={() => deleteTodo(id)}>-</button>
    </div>
  );
}
export default Todo;
