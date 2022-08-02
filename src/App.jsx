import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTodo, updateTodo, deleteTodo } from "./redux/todoSlice";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [todosStatus, setTodosStatus] = useState([]);
  const todos = useSelector((state) => state.todos.data);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleChangeStatus = (selectedIdx) => {
    const newTodosStatus = todosStatus.map((status, idx) => {
      return idx === selectedIdx ? !status : status;
    });
    setTodosStatus(newTodosStatus);
    const selectedTodo = {
      ...todos[selectedIdx],
      status:
        todos[selectedIdx].status === "completed" ? "in progress" : "completed",
    };
    dispatch(updateTodo(selectedTodo));
  };

  const handleDeletTodo = (todoId) => {
    dispatch(deleteTodo(todoId));
  };

  useEffect(() => {
    setTodosStatus(todos.map((todo) => todo.status === "completed"));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTask("");
    dispatch(
      addTodo({
        id: uuidv4(),
        task,
        status: "in progress",
      })
    );
  };

  return (
    <main>
      <h3>Welcome to React TODO</h3>
      <form onSubmit={handleSubmit}>
        <textarea value={task} onChange={handleChange} rows={4} />
        <button type="submit">Add</button>
      </form>
      <div className="todos-container">
        {todos.map((todo, idx) => (
          <div key={todo.id} className="todo-item">
            <span>
              {idx + 1}. {todo.task}
            </span>
            <div className="todo-actions">
              <div>
                <input
                  id={`status-${idx}`}
                  type="checkbox"
                  checked={todosStatus[idx]}
                  onChange={() => handleChangeStatus(idx)}
                />
                <label htmlFor={`status-${idx}`}>{todo.status}</label>
              </div>
              <span class="close" onClick={() => handleDeletTodo(todo.id)}>
                &times;
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
