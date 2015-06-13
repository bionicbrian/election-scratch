"use strict";

import React from "react";
import Poll from "./components/Poll";
import appDispatcher from "./appDispatcher";
import PollModel from "./models/PollModel";
import CandidateModel from "./models/CandidateModel";

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

var candidateFactory = (spec) => new CandidateModel(spec);

var poll = new PollModel(store, global.io(), appDispatcher, candidateFactory);

React.render(<Poll poll={ poll } />, document.querySelector("#main"));
