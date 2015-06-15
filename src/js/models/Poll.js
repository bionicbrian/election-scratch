"use strict";

import Q from "q";
import _ from "underscore";
import { makeEmitter } from "pubit-as-promised";

export default function Poll({ candidateFactory, ballot, store, socket }) {
    var publish = makeEmitter(this, ["CHANGE"]);
    var publishChange = () => publish("CHANGE");

    var emit = (type, data) => socket.emit(type, data);

    this.addCandidate = (name, link) => {
        var c = candidateFactory(name, link, ballot);
        c.on("cast-vote", publishChange);
        c.on("retract-vote", publishChange);

        store.add("candidates", c);
        emit("candidate-add", c);

        publishChange();
        return Q.resolve();
    };

    this.removeCandidate = ({ candidateId }) => {
        store.remove("candidates", candidateId);

        publishChange();
        return Q.resolve();
    };

    Object.defineProperty(this, "candidates", {
        get() {
            return store.candidates;
        },
        enumerable: true
    });
}
