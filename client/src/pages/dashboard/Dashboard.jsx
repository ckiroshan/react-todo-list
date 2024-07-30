import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useTodos } from "../../contexts/TodoContext";
import { useUser } from "@clerk/clerk-react";

const Dashboard = () => {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
  const { user } = useUser(); // Get user details from Clerk
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [todoToDelete, setTodoToDelete] = useState(null); // Track which todo is being deleted

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (input.trim()) {
      addTodo({
        text: input,
        completed: false,
        userId: user.id,
        name: user.fullName,
      });
      setInput("");
    }
  };

  const toggleComplete = (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    updateTodo(id, { ...todoToUpdate, completed: !todoToUpdate.completed });
  };

  const handleDeleteTodo = (id) => {
    setTodoToDelete(id); // Set the todo to delete, triggering the animation
    setTimeout(() => {
      deleteTodo(id); // After animation ends, delete the todo from the list
    }, 500); // Match this delay with the animation duration
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "uncompleted") return !todo.completed;
    return true;
  });

  return (
    <div className="dashboard-container">
      <h1 className="todo-header">Add Tasks to get started...</h1>

      <form onSubmit={handleAddTodo}>
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

      <div className="todo-container">
        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <div className={`todo ${todo.completed ? "completed" : ""} ${todoToDelete === todo.id ? "fall" : ""}`} key={todo.id}>
              <li className="todo-item">{todo.text}</li>
              <button className="complete-btn" onClick={() => toggleComplete(todo.id)}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button className="delete-btn" onClick={() => handleDeleteTodo(todo.id)}>
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
