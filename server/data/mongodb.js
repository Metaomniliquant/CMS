"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
exports.connect = function () {
    mongoose.connect('mongodb://localhost:27017'); // Connects to your MongoDB.  Make sure mongod is running!
    mongoose.connection.on('error', function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log(args);
        console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
        process.exit(1);
    });
};
