const express = require('express');
const mongoose = require('mongoose');
const todos = require('./routes/Todo');
const bigTodos = require('./routes/BigTodo');

const app = express();

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.use(express.json());
app.use('/todos', todos);
app.use('/bigtodos', bigTodos);

require('dotenv').config();

mongoose
  .connect(`mongodb://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@${process.env.MONGO_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const port = process.env.PORT

    app.listen(port, () => {
      console.log(`API server listening ${port}`);
    });
  })
  .catch(error => console.error('Error connecting to MongoDB ', error));

app.get('/', async (req, res) => {
	return res.send('Hello, it\'s my API!');
})