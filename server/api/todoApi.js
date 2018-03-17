"use strict";
exports.__esModule = true;
var Todo_1 = require("../data/schema/Todo");
var TodoApi = /** @class */ (function () {
    function TodoApi() {
    }
    TodoApi.prototype.index = function (req, res, next) {
        Todo_1.Todo.find(function (err, todos) {
            if (err) {
                return res.send(err);
            }
            res.json(todos);
        });
    };
    TodoApi.prototype.item = function (req, res, next) {
        Todo_1.Todo.findById(req.params.id, function (err, todo) {
            if (err) {
                return res.send(err);
            }
            res.json(todo);
        });
    };
    TodoApi.prototype.post = function (req, res, next) {
        Todo_1.Todo.create({
            text: req.body.text,
            description: req.body.description,
            done: !!req.body.done
        }, function (err, todo) {
            if (err) {
                return res.send(err);
            }
            Todo_1.Todo.find(function (err, todos) {
                if (err) {
                    return res.send(err);
                }
                res.json(todos);
            });
        });
    };
    TodoApi.prototype.put = function (req, res, next) {
        Todo_1.Todo.findByIdAndUpdate(req.params.id, req.body, function (err, todo) {
            if (err) {
                return res.send(err);
            }
            Todo_1.Todo.find(function (err, todos) {
                if (err) {
                    return res.send(err);
                }
                res.json(todos);
            });
        });
    };
    TodoApi.prototype["delete"] = function (req, res, next) {
        Todo_1.Todo.findByIdAndRemove(req.params.id, function (err, todo) {
            if (err) {
                return res.send(err);
            }
            Todo_1.Todo.find(function (err, todos) {
                if (err) {
                    return res.send(err);
                }
                res.json(todos);
            });
        });
    };
    return TodoApi;
}());
exports.TodoApi = TodoApi;
