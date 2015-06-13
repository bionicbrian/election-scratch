"use strict";

import Q from "q";
import _ from "underscore";
import AppDispatcher from "../AppDispatcher";
import enums from "../enums";
import Candidate from "./Candidate";
import { makeEmitter } from "pubit-as-promised";

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

function Poll(store) {
    var publish = makeEmitter(this, ["CHANGE"]);
    var socket;

    this.publish = publish;

    var sEmit = (type, data) => {
        socket.emit("candidate-add", data);
    };

    this.attachSocket = (newSocket) => {
        socket = newSocket;
    };

    var findTheCandidate = (candidateId) => _.findWhere(store.candidates, { id: candidateId });

    this.addCandidate = (spec) => {// { name, link }) {
        var c = new Candidate(spec);
        store.add("candidates", c);
        sEmit("candidate-add", c);
        return Q.resolve();
    };

    this.removeCandidate = ({ candidateId }) => {
        store.remove("candidates", candidateId);
        return Q.resolve();
    };

    this.castVote = ({ candidateId, value }) => {
        var candidate = findTheCandidate(candidateId);
        var userVoteExists = candidate.votes.some((vote) => vote.ballotId === ballotId);

        if (!userVoteExists) {
            candidate.hasLocalVote = true;
            var vote = { value, ballotId };
            candidate.votes.push(vote);
        }

        return Q.resolve();
    };

    this.retractVote = ({ candidateId }) => {
        var candidate = findTheCandidate(candidateId);
        var newVotes = candidate.votes.filter((vote) => {
            var doesNotHaveLocalVote = vote.ballotId !== ballotId;
            if (!doesNotHaveLocalVote) {
                candidate.hasLocalVote = false;
            }
            return doesNotHaveLocalVote;
        });

        candidate.votes = newVotes;

        return Q.resolve();
    };

    Object.defineProperty(this, "candidates", {
        get() {
            return store.candidates;
        },
        enumerable: true
    });
}

var poll = new Poll(store);

var ballotId = 123; // _.unique("ballot_"); or SHA2 or something

AppDispatcher.register(function (payload) {
    var type = payload.type;
    var promise;

    switch (type) {
        case enums.ADD_CANDIDATE:
            promise = poll.addCandidate(payload.data);
            break;
        case enums.REMOVE_CANDIDATE:
            promise = poll.removeCandidate(payload.data);
            break;
        case enums.CAST_VOTE:
            promise = poll.castVote(payload.data);
            break;
        case enums.RETRACT_VOTE:
            promise = poll.retractVote(payload.data);
            break;
        default:
            break;
    }

    promise.done(() => poll.publish("CHANGE"));
});

export default poll;
