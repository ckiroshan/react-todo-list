import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [todos, setTodos] = useState(() => {
    // Load todos from local storage or return an empty array
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [falling, setFalling] = useState([]); // New state for falling animation

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (event) => {
    event.preventDefault();
    if (input.trim()) {
      const newTodos = [...todos, { text: input, completed: false }];
      setTodos(newTodos);
      setInput("");
    }
  };

  const deleteCheck = (index) => {
    // Mark the todo as falling before removing it
    setFalling((prev) => [...prev, index]);

    // Remove the todo after a short delay to allow animation
    setTimeout(() => {
      const newTodos = todos.filter((_, i) => i !== index);
      setTodos(newTodos);
      setFalling((prev) => prev.filter((i) => i !== index)); // Clean up falling state
    }, 300); // CSS transition duration
  };

  // Toggle the completion status of a todo item
  const toggleComplete = (index) => {
    const newTodos = [...todos]; // Create a copy of current todos array
    newTodos[index].completed = !newTodos[index].completed; // Toggle the completed status
    setTodos(newTodos); // Update the state with the modified todos
  };

  // Filter the todos based on selected filter criteria
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed; // Include only completed todos
    if (filter === "uncompleted") return !todo.completed; // Include only uncompleted todos
    return true; // Include all todos if no filter is applied
  });

  return (
    <div className="dashboard-container">
      <h1 className="todo-header">Add Tasks to get started...</h1>

      {/* Add new list Item */}
      <form onSubmit={addTodo}>
        <input type="text" className="todo-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Add a new task" />
        <button className="todo-button" type="submit">
          <FontAwesomeIcon style={{ fontSize: "2rem" }} icon={faPlusSquare} />
        </button>
        <div className="select">
          <select name="todos" className="filter-todo" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>

      {/* List of To-Do Items */}
      <div className="todo-container">
        <ul className="todo-list">
          {filteredTodos.map((todo, index) => (
            <div
              className={`todo ${falling.includes(index) ? "fall" : ""}`} // Apply fall class
              key={index}
            >
              <li className={`todo-item ${todo.completed ? "completed" : ""}`}>{todo.text}</li>
              <button className="complete-btn" onClick={() => toggleComplete(index)}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button className="delete-btn" onClick={() => deleteCheck(index)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
