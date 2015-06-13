"use strict";

var express = require("express");
var app = express();

var http = require("http").Server(app);
var io = require("socket.io")(http);

var path = require("path");
var fs = require("fs");

var index = path.join(__dirname, "index.html");

app.use(express.static(__dirname + '/public'));

function log (req, res, next) {
    console.log("Got a request.");
    next();
}

app.get("/", log, function (req, res) {
    res.sendFile(index);
});

io.on("connection", function () {
    console.log("A user connected!");
});

http.listen(3000, function () {
    console.log("CONNECTED TO PORT 3000");
});
