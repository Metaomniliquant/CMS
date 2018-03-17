"use strict";
exports.__esModule = true;
var express_1 = require("express");
var todoRouter_1 = require("./todoRouter");
var ApiRouter = /** @class */ (function () {
    function ApiRouter(router, todoRouter) {
        if (router === void 0) { router = express_1.Router(); }
        if (todoRouter === void 0) { todoRouter = new todoRouter_1.TodoRouter(); }
        this.router = router;
        this.todoRouter = todoRouter;
    }
    ApiRouter.prototype.createRouteHandler = function () {
        var handler = this.todoRouter.createRouteHandler();
        this.router.use('/api', handler);
        return this.router;
    };
    return ApiRouter;
}());
exports.ApiRouter = ApiRouter;
