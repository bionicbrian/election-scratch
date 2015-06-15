"use strict";

import React from "react";
import Poll from "./components/Poll";
import PollModel from "./models/Poll";
import CandidateModel from "./models/Candidate";

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
var candidateFactory = (...args) => new CandidateModel(...args);
var poll = new PollModel({ ballot, candidateFactory, store, socket });

React.render(<Poll poll={ poll } />, document.querySelector("#main"));
