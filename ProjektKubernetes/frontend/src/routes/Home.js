import React from 'react'
import { useNavigate } from "react-router-dom";

function Menu() {
   const navigate = useNavigate();

   const goToTodos = () => {
      navigate("/todos");
   }
   const goToBigTodos = () => {
      navigate("/bigtodos");
   }

   return (
      <div>
         <h1>Home</h1>
         <button onClick={goToTodos}>Todos</button>
         <button onClick={goToBigTodos}>BIG Todos</button>
      </div>
   )
}

export default Menu