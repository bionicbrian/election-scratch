"use strict";

import Q from "q";
import _ from "underscore";
import { ADD_CANDIDATE, REMOVE_CANDIDATE } from "../enums";
import { makeEmitter } from "pubit-as-promised";

export default function Poll({ candidateFactory, ballot, store }) {
    var publish = makeEmitter(this, ["CHANGE"]);
    var publishChange = (data) => publish("CHANGE", data);

    store.on("CHANGE", (data) => publishChange(data));

    var candidates = [];

    this.addCandidate = (name, link) => {
        var c = candidateFactory(name, link, ballot, publishChange);
        candidates.push(c);
        publishChange({
            type: ADD_CANDIDATE,
            payload: { pollId: this.id, candidate: c }
        });
    };

    this.removeCandidate = ({ candidateId }) => {
        candidates = candidates.reject((candidate) => candidate.id === candidateId);
        publishChange({
            type: REMOVE_CANDIDATE,
            payload: { pollId: this.id, candidateId }
        });
    };

    Object.defineProperty(this, "candidates", {
        get() {
            return candidates;
        },
        enumerable: true
    });
}
