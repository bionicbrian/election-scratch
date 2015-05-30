"use strict";

import AppDispatcher from "../AppDispatcher";
import enums from "../enums";
import StoreIt from "storeIt";

var store = new StoreIt();

var addCandidate = ({ name, link }) {
    store.add(); // proper API?
};

var removeCandidate = ({ candidateId }) {
    store.remove(); // API?
};

// Really need to think about how we're going to use the
// concept of Ballots here
var castVote = ({ candidateId, value }) {
    store.modify();
};

var retractVote = ({ candidateId, })

AppDispatcher.register(function (payload) {
    var type = payload.type;
    var promise;

    switch (type) {
        case enums.ADD_CANDIDATE:
            promise = Q.when(addCandidate(payload.data));
            break;
        case enums.REMOVE_CANDIDATE:
            promise = Q.when(removeCandidate(payload.data));
            break;
        default:
            break;
    }

    promise.done(function () { store.emit("CHANGE") });
});

export default store;
