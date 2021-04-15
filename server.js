"use strict";
const express = require("express");
const cors = require('cors')
const bodyParser = require("body-parser");
const debug = require("debug")("user-auth");
const app = express();
const http = require("http");
const index = require("./routes/index");
const { v4: uuidv4 } = require('uuid');
const LRU = require('lru-cache');
const config = require('./config/index');

// LRU cache implimentation
const cache = new LRU({  
  max : config.LRUConfig.max,                   // The maximum number of items allowed in the cache
  max_age : config.LRUConfig.max_age            // The maximum life of a cached item in milliseconds
});

//setting up cache instance as global
global.cache = cache;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(cors());

/**
 * request logging
 */
app.use(function (req, res, next) {
    var reqId = uuidv4();
    req.body.reqId = reqId;
    next();
});

app.use('/viaplay', index); // addes all the api.. to server

app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    console.log("error:" + err);
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") == "dev" ? err : err;
    // render the error page
    res.status(err.status);
    res.send(err);
});
const port = normalizePort("3000");
app.set("port", port);
let server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;




/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
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
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ?
        'pipe ' + addr :
        'port ' + addr.port;
    console.log("server has started on : http://" + addr.address + ":" + addr.port + " -env: " + process.env.NODE_ENV || 'local');
    debug('Listening on ' + bind);
}