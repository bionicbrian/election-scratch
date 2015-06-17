"use strict";

import React from "react";
import Poll from "./components/Poll";
import PollModel from "./models/Poll";
import CandidateModel from "./models/Candidate";
import Gateway from "./gateways/PollGateway";

var store = {
    candidates: [],
    add(type, data) {
        this[type].push(data);
    },
    remove(type, id) {
        newList = this[type].map((item) => item.id !== id);
        this[type] = newList;
    }
};
var ballot = { id: 123 };

var socket = global.io();
var gateway = new Gateway(socket);
var candidateFactory = (...args) => new CandidateModel(...args);
var poll = new PollModel({ ballot, candidateFactory, store, gateway });

React.render(<Poll poll={ poll } />, document.querySelector("#main"));
