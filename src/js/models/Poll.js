"use strict";

import Q from "q";
import _ from "underscore";
import { makeEmitter } from "pubit-as-promised";

export default function Poll({ candidateFactory, ballot, store }) {
    var publish = makeEmitter(this, ["CHANGE"]);
    var publishChange = () => publish("CHANGE");

    store.on("CHANGE", publishChange);

    this.addCandidate = (name, link) => {
        var c = candidateFactory(name, link, ballot);
        store.add("candidates", c.data);
    };

    // This needs to be cleaned up, made to work. :)
    this.removeCandidate = ({ candidateId }) => {
        store.remove("candidates", candidateId);
    };

    Object.defineProperty(this, "candidates", {
        get() {
            return store.candidates;
        },
        enumerable: true
    });
}
