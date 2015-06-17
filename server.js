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

io.on("connection", function (socket) {
    console.log("A user connected!");

    socket.on("candidate-add", function (data) {
        console.log("got a ADD CANDIDATE event");
        console.dir(data);
    });

    socket.on("candidate-remove", function (data) {
        console.log("got a REMOVE CANDIDATE event");
        console.dir(data);
    });

    socket.on("vote-add", function (data) {
        console.log("got a ADD VOTE event");
        console.dir(data);
    });

    socket.on("vote-remove", function (data) {
        console.log("got a REMOVE VOTE event");
        console.dir(data);
    });

    socket.on("disconnect", function () {
        console.log("A user disconnected!");
    });
});

http.listen(3000, function () {
    console.log("CONNECTED TO PORT 3000");
});
