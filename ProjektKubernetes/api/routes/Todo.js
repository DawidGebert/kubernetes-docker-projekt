const express = require('express');
const Todo = require('../models/Todo');
const router = express.Router();

router.get('/', async (req, res) => {
  const todos = await Todo.find();
  return res.send({
      todos: todos
    });
});

router.post('/', async (req, res) => {
  const todo = new Todo({
    content: req.body.content
  });

  try {
    const newTodo = await todo.save();
    return res.send(newTodo);
  } 
  catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 
router.delete('/:id', getTodo, async (req, res) => {
  try {
    await res.todo.remove()
    return res.send({
      deletedTodoId: res.todo.id
    });
  } 
  catch (err) {
    res.status(500).json({ message: err.message })
  }
});

async function getTodo(req, res, next){
  let todo;
  try {
    todo = await Todo.findById(req.params.id)
    if (todo == null) {
      return res.status(404).json({ message: 'Cant find the todo'});
    }
  } 
  catch (err) {
    return res.status(500).json({ message: err.message});
  }

  res.todo = todo;
  next();
}


module.exports = router;