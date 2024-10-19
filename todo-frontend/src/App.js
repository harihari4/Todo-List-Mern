import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './api';
import './App.css';


function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from the backend
  useEffect(() => {
    getTodos().then((res) => setTodos(res.data));
  }, []);

  const handleCreateTodo = () => {
    createTodo(newTodo).then((res) => {
      setTodos([...todos, res.data]);
      setNewTodo('');
    });
  };

  const handleUpdateTodo = (id, updatedData) => {
    updateTodo(id, updatedData).then((res) => {
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    });
  };

  const handleDeleteTodo = (id) => {
    deleteTodo(id).then(() => {
      setTodos(todos.filter((todo) => todo._id !== id));
    });
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className='todo-form'>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleCreateTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className={todo.completed ? 'completed' : ''} >
            <input
              type="text"
              className='input-listitems'
              value={todo.title}
              onChange={(e) =>
                handleUpdateTodo(todo._id, {
                  title: e.target.value,
                  completed: todo.completed,
                })
              }
            />
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                handleUpdateTodo(todo._id, {
                  title: todo.title,
                  completed: !todo.completed,
                })
              }
            />
            <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
