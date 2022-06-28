import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function Todos() {
   const [newTodoText, setNewTodoText] = useState('');
   const [todos, setTodos] = useState([]);

   const navigate = useNavigate();

   useEffect(() => {
    axios.get(`/api/todos`)
    .then((response) => {
       setTodos(response.data.todos)
    })
   }, [navigate])

   const addNewTodo = () => {
    const newTodo = {
      content: newTodoText
    }
  
    axios.post(`/api/todos`, newTodo)
    .then(() => {
      alert("Success added new todo");
    })
  }

  const deleteTodo = (id) => {
    axios.delete(`/api/todos/${id}`)
    .then(() => {
      alert("Success deleted")
      setTodos(todos.filter(todo => todo._id !== id))
    });
  }

  const goHome = () => {
    navigate("/");
  }

  return (
    <div>
      <button onClick={goHome}> ^ Home ^</button>
      <h2>Todos: </h2>
      <div>
         {todos.map(todo =>
              <div key={todo._id}>
                {todo.content}
                <button onClick={() => deleteTodo(todo._id)}>Delete</button>
              </div>
         )}
      </div>

      <form onSubmit={addNewTodo}>
        <div>
            <label htmlFor="newTodo">new todo text: </label>
            <input
              id="newTodo"
              type="text"
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
            />
        </div>
        <button type="submit">add new todo</button>
      </form>
    </div>
  )
}

export default Todos