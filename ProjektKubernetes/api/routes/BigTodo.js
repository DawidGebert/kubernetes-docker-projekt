const express = require('express');
const BigTodo = require('../models/BigTodo');
const router = express.Router();

const Redis = require("ioredis");
require('dotenv').config();

const dbConnData = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_URL
}
const rdClient = new Redis(dbConnData);

rdClient.on('connect', function() {
  console.log('Redis connected');
});

router.get('/', async (req, res) => {
  var bigTodoIds = [];
  var bigTodos = [];
  var redisDataBool = false

  await rdClient.keys('bigTodo*', (err, rep) => {
    if(rep.length > 0) {
      redisDataBool = true;
      bigTodoIds = rep;
    }
  });

  if(redisDataBool == true) {
    let indexMax = bigTodoIds.length;
    let index = 0;
    
    bigTodoIds.forEach(async todo => {
      await rdClient.get(todo, (err, rep) => {
        if(rep != null) {
          bigTodoIds.push(JSON.parse(rep));
          index++;
        }
        if(index == indexMax){
          return res.send({
            bigTodos: bigTodos
          });
        }
      });
    });
  } 
  else {
    bigTodos = await BigTodo.find();
    if(bigTodos.length > 0){
      let totalCount = bigTodos.length;
      let count = 0;
      bigTodos.forEach(async todo => {
        await rdClient.set(`bigTodo${todo._id}`, JSON.stringify(todo));
        count++;
        if(count == totalCount){
          return res.send({
            bigTodos: bigTodos
          });
        }
      });
    } else {
      return res.send({
        bigTodos: bigTodos
      });
    }
  }
});

router.post('/', async (req, res) => {
  const bigTodo = new BigTodo({
    content: req.body.content
  });

  try {
    const newBigTodo = await bigTodo.save();
    await rdClient.set(`bigTodo${newBigTodo._id}`, JSON.stringify(newBigTodo));
    
    return res.send(newBigTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
 
router.delete('/:id', getBigTodo, async (req, res) => {
  try {
    await res.bigTodo.remove();
    await rdClient.del(`bigTodo${req.params.id}`);

    return res.send({
      deletedBigTodoId: res.bigTodo.id
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }

});

async function getBigTodo(req, res, next){
  let bigTodo = "";

  try {
      bigTodo = await BigTodo.findById(req.params.id)
      if (bigTodo == null) {
         return res.status(404).json({ message: 'Cant find the todo'});
      }
  } catch (err) {
    return res.status(500).json({ message: err.message});
  }

  res.bigTodo = bigTodo;
  next();
}


module.exports = router;