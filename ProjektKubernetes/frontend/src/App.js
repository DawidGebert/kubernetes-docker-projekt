import './App.css';
import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './routes/Home';
import Todos from './routes/Todos';
import BigTodos from './routes/BigTodos';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
           <Route exact path="/" element={<Home />} />
           <Route exact path="/todos" element={<Todos />} />
           <Route exact path="/bigtodos" element={<BigTodos />} />
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
