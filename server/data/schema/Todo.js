"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var todoSchema = new mongoose.Schema({
    text: String,
    description: String,
    done: Boolean
});
exports.Todo = mongoose.model('Todo', todoSchema);
