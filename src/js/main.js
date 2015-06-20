"use strict";

import _ from "underscore";
import React from "react";
import Poll from "./components/Poll";
import PollModel from "./models/Poll";
import CandidateModel from "./models/Candidate";
import { makeEmitter } from "pubit-as-promised";

class SocketStore {
    constructor(socket) {
        this._publish = makeEmitter(this, ["CHANGE"]);
        this._socket = socket;
        this._listenToSocket(socket);
    }

    _emit(type, data) {
        this._socket.emit(type, data);
    }

    _listenToSocket(socket) {
        socket.on("candidate-add", (data) => {
            this.add("candidates", data);
        });
    }

    add(type, data) {
        this._emit(`${type}-add`, data);
        this._publish("CHANGE");
    }

    remove(type, id) {
        this._emit(`${type}-remove`, { id });
        this._publish("CHANGE");
    }
}

class Ballot {
    constructor() {
        this.id = 123
    }
}

var socket = global.io();
var store = new SocketStore(socket);

var ballot = new Ballot();
var candidateFactory = (...args) => new CandidateModel(...args);
var poll = new PollModel({ ballot, candidateFactory, store });

React.render(<Poll poll={ poll } />, document.querySelector("#main"));
