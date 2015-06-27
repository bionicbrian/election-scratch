"use strict";

import _ from "underscore";
import React from "react";
import Poll from "./components/Poll";
import PollModel from "./models/Poll";
import CandidateModel from "./models/Candidate";
import { makeEmitter } from "pubit-as-promised";

class Ballot {
    constructor() {
        this.id = 123
    }
}

// var socket = global.io();

var ballot = new Ballot();
var candidateFactory = (...args) => new CandidateModel(...args);
var poll = new PollModel({ ballot, candidateFactory });

React.render(<Poll poll={ poll } />, document.querySelector("#main"));
