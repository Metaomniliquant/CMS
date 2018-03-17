"use strict";
exports.__esModule = true;
var express_1 = require("express");
var todoApi_1 = require("../api/todoApi");
var TodoRouter = /** @class */ (function () {
    function TodoRouter(router, api) {
        if (router === void 0) { router = express_1.Router(); }
        if (api === void 0) { api = new todoApi_1.TodoApi(); }
        this.router = router;
        this.api = api;
    }
    TodoRouter.prototype.createRouteHandler = function () {
        var handler = this.createSubRouteHandler();
        this.router.use('/todo', handler);
        return this.router;
    };
    TodoRouter.prototype.createSubRouteHandler = function () {
        var router = express_1.Router();
        // GET: /*/todo
        router.get('/', this.api.index.bind(this.api.index));
        // GET: /*/todo/1
        router.get('/:id', this.api.item.bind(this.api.item));
        // POST: /*/todo
        router.post('/', this.api.post.bind(this.api.item));
        // PUT: /*/todo/1
        router.put('/:id', this.api.put.bind(this.api.item));
        // DELETE: /*/todo/1
        router["delete"]('/:id', this.api["delete"].bind(this.api.item));
        return router;
    };
    return TodoRouter;
}());
exports.TodoRouter = TodoRouter;
