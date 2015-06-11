"use strict";

import Q from "q";
import _ from "underscore";
import AppDispatcher from "../AppDispatcher";
import enums from "../enums";
import Candidate from "./Candidate";
import { makeEmitter } from "pubit-as-promised";

function Store() {
    var publish = makeEmitter(this, ["CHANGE"]);

    this.publish = publish;
    this.candidates = [];
}

var store = new Store();

var ballotId = 123; // _.unique("ballot_"); or SHA2 or something

var findTheCandidate = (candidateId) => _.findWhere(store.candidates, { id: candidateId });

var addCandidate = (spec) => {// { name, link }) {
    var c = new Candidate(spec);
    store.candidates.push(c);
};

var removeCandidate = ({ candidateId }) => {
    store.candidates = store.candidates.filter((candidate) => candidate.id !== candidateId);
};

var castVote = ({ candidateId, value }) => {
    var candidate = findTheCandidate(candidateId);
    var userVoteExists = candidate.votes.some((vote) => vote.ballotId === ballotId);

    if (userVoteExists) {
        return;
    }

    candidate.hasLocalVote = true;
    var vote = { value, ballotId };
    candidate.votes.push(vote);
};

var retractVote = ({ candidateId }) => {
    var candidate = findTheCandidate(candidateId);
    var newVotes = candidate.votes.filter((vote) => {
        var doesNotHaveLocalVote = vote.ballotId !== ballotId;
        if (!doesNotHaveLocalVote) {
            candidate.hasLocalVote = false;
        }
        return doesNotHaveLocalVote;
    });
    candidate.votes = newVotes;
};

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
        case enums.CAST_VOTE:
            promise = Q.when(castVote(payload.data));
            break;
        case enums.RETRACT_VOTE:
            promise = Q.when(retractVote(payload.data));
            break;
        default:
            break;
    }

    promise.done(() => store.publish("CHANGE"));
});

export default store;
