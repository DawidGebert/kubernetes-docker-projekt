const { Schema, model } = require('mongoose');

const bigTodoSchema = new Schema({
    content: String
});

module.exports = model('BigTodo', bigTodoSchema);