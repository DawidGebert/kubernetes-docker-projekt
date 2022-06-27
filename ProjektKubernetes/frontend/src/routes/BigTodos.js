import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const backendURL = process.env.REACT_APP_BACKEND_URL

function BigTodos() {
   const [newBigTodoText, setNewBigTodoText] = useState('');
   const [bigTodos, setBigTodos] = useState([]);

   const backendURL = process.env.REACT_APP_BACKEND_URL

   const navigate = useNavigate();

   useEffect(() => {
      axios.get(`${backendURL}/bigtodos`)
      .then((response) => {
         setBigTodos(response.data.bigTodos)
      })
    }, [navigate])

   const addNewBigTodo = () => {
      const newBigTodo = {
         content: newBigTodoText
      }
      axios.post(`${backendURL}/bigtodos`, newBigTodo)
      .then(() => {
         alert("added!")
      })
   }

   const deleteBigTodo = (id) => {
      axios.delete(`${backendURL}/bigtodos/${id}`)
      .then(() => {
         alert("deleted!")
         setBigTodos(bigTodos.filter(bigTodo => bigTodo._id !== id))
      });
   }

   const goToMenu = () => {
      navigate("/");
   }

   return (
      <div>
         <button onClick={goToMenu}>^ Home ^</button>

         <h1>Your BIG todos: </h1>

         <div>
            {bigTodos.map(bigTodo =>
               <div key={bigTodo._id}>
                  {bigTodo.content}
                  <button onClick={() => deleteBigTodo(bigTodo._id)}>Delete</button>
               </div>
            )}
         </div>
         <br/>

         <form onSubmit={addNewBigTodo}>
         <div>
               <label htmlFor="newBigTodo">new BIG todo: </label>
               <input
               id="newBigTodo"
               type="text"
               value={newBigTodoText}
               onChange={(e) => setNewBigTodoText(e.target.value)}
               />
         </div>
         <button type="submit">add new BIG todo</button>
         </form>
      </div>
   )
}

export default BigTodos