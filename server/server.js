"use strict";
exports.__esModule = true;
var bodyParser = require("body-parser");
var express = require("express");
var debug = require("debug");
var path = require("path");
var http = require("http");
var mongodb_1 = require("./data/mongodb");
var apiRouter_1 = require("./routes/apiRouter");
var log = debug("CMS:Server");
var ServerConfig = /** @class */ (function () {
    function ServerConfig() {
    }
    ServerConfig.create = function (process, port, workingDirectory) {
        var config = new ServerConfig();
        config.process = process;
        config.port = port;
        config.workingDirectory = workingDirectory;
        return config;
    };
    return ServerConfig;
}());
exports.ServerConfig = ServerConfig;
var Server = /** @class */ (function () {
    function Server(process, fallbackPort, workingDirectory) {
        this.process = process;
        this.fallbackPort = fallbackPort;
        this.workingDirectory = workingDirectory;
        this.connectDatabase();
        this.createApiHandler();
        this.createExpressApplication();
        this.configureApplication();
        this.configureRoutes();
        this.setApplicationPort();
        this.createServer();
        this.startListening();
    }
    Server.start = function (config) {
        return new Server(config.process, config.port, config.workingDirectory);
    };
    Server.prototype.getPort = function () {
        return this.normalizePort(this.process.env['PORT'] || this.fallbackPort);
    };
    Server.prototype.connectDatabase = function () {
        mongodb_1.connect();
    };
    Server.prototype.createApiHandler = function () {
        this.apiRouter = new apiRouter_1.ApiRouter();
        this.apiRouteHandler = this.apiRouter.createRouteHandler();
    };
    Server.prototype.createExpressApplication = function () {
        this.app = express();
    };
    Server.prototype.configureApplication = function () {
        // Parsers for POST data
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // Point static path to dist
        this.app.use(express.static(this.workingDirectory));
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "http://localhost:4200");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            next();
        });
    };
    Server.prototype.configureRoutes = function () {
        var _this = this;
        //create routes
        this.app.use('/', this.apiRouteHandler);
        // Catch all other routes and return the index file
        this.app.get('*', function (req, res) {
            res.sendFile(path.join(_this.workingDirectory, 'index.html'));
        });
    };
    Server.prototype.setApplicationPort = function () {
        this.app.set('port', this.getPort());
    };
    Server.prototype.createServer = function () {
        this.server = http.createServer(this.app);
    };
    Server.prototype.startListening = function () {
        this.server.on("error", this.onError.bind(this));
        this.server.on("listening", this.onListening.bind(this));
        this.server.listen(this.getPort());
    };
    Server.prototype.normalizePort = function (val) {
        var port = parseInt(val, 10);
        if (isNaN(port)) {
            // named pipe
            return val;
        }
        if (port >= 0) {
            // port number
            return port;
        }
        return false;
    };
    Server.prototype.onError = function (error) {
        if (error.syscall !== "listen") {
            throw error;
        }
        var port = this.getPort();
        var bind = typeof port === "string"
            ? "Pipe " + port
            : "Port " + port;
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case "EACCES":
                console.error(bind + " requires elevated privileges");
                this.process.exit(1);
                break;
            case "EADDRINUSE":
                console.error(bind + " is already in use");
                this.process.exit(1);
                break;
            default:
                throw error;
        }
    };
    Server.prototype.onListening = function () {
        var addr = this.server.address();
        var bind = typeof addr === "string"
            ? "pipe " + addr
            : "port " + addr.port;
        log("Listening on " + bind);
    };
    return Server;
}());
exports.Server = Server;
