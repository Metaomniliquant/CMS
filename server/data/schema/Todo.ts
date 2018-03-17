import * as mongoose from 'mongoose';

let todoSchema = new mongoose.Schema({
    text: String,
    description: String,
    done: Boolean
});

export const Todo = mongoose.model('Todo', todoSchema);
