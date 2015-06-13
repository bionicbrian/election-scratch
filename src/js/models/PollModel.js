"use strict";

import Q from "q";
import _ from "underscore";
import enums from "../enums";
import { makeEmitter } from "pubit-as-promised";

export default function PollModel(store, socket, dispatcher, candidateFactory) {
    var publish = makeEmitter(this, ["CHANGE"]);

    var ballotId = _.uniqueId("ballot_");

    this.publish = publish;
    var emit = (type, data) => socket.emit(type, data);

    var findTheCandidate = (candidateId) => _.findWhere(store.candidates, { id: candidateId });

    this.addCandidate = (spec) => {// { name, link }) {
        var c = candidateFactory(spec);
        store.add("candidates", c);
        emit("candidate-add", c);
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

    dispatcher.register((payload) => {
        var type = payload.type;
        var promise;

        switch (type) {
            case enums.ADD_CANDIDATE:
                promise = this.addCandidate(payload.data);
                break;
            case enums.REMOVE_CANDIDATE:
                promise = this.removeCandidate(payload.data);
                break;
            case enums.CAST_VOTE:
                promise = this.castVote(payload.data);
                break;
            case enums.RETRACT_VOTE:
                promise = this.retractVote(payload.data);
                break;
            default:
                break;
        }

        promise.done(() => this.publish("CHANGE"));
    });
}
