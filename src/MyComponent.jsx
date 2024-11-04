import Todo from "./Todo";
import React, { useState, useEffect } from "react";
import sunIcon from "./icons/sun.png";
import moonIcon from "./icons/moon.png";

function MyComponent() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [inputVal, setInputVal] = useState("");

  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  const [url, setUrl] = useState(sunIcon);
  const [visibleMenu, setVisibleMenu] = useState(false);

  const toggleMenu = () => {
    setVisibleMenu(!visibleMenu);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    setUrl(theme === "dark" ? moonIcon : sunIcon);
  }, [theme]);

  const addTodo = (event) => {
    if (inputVal === "") {
      event.preventDefault();
    } else {
      const newTodo = {
        task: inputVal,
        id: Date.now(),
        dateCreated: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString(
          [],
          { hour: "2-digit", minute: "2-digit" }
        )}`,
        isDone: false,
      };
      setTodos([...todos, newTodo]);
      setInputVal("");
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [theme, todos]);

  return (
    <>
      <div>
        <header>
          <div id="header-left">
            <h1>To-Do List</h1>
          </div>
          <section>
            <button id="todo-adder" onClick={addTodo}>
              +
            </button>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              spellCheck="false"
            />
          </section>
          <button id="theme-changer" onClick={toggleTheme}>
            <img src={url} alt="theme-icon" />
          </button>
        </header>
        <div>
          <ul>
            {todos
              .slice()
              .reverse()
              .map((todo, index) => (
                <React.Fragment key={index}>
                  <li>
                    <Todo
                      title={todo.task}
                      id={todo.id}
                      date={todo.dateCreated}
                      deleteTodo={deleteTodo}
                      isDone={todo.isDone}
                      toggleDone={toggleDone}
                    />
                  </li>
                  {index < todos.length - 1}
                </React.Fragment>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MyComponent;
