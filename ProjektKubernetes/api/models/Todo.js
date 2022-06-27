const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
    content: String
});

module.exports = model('Todo', todoSchema);