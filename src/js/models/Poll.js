"use strict";

import Q from "q";
import _ from "underscore";
import { makeEmitter } from "pubit-as-promised";
import observableVector from "../helpers/observableVector";
import ProxyPublisher from "../helpers/ProxyPublisher";

export default function Poll({ candidateFactory, ballot }) {
    this.id = _.uniqueId("poll_");

    var publish = makeEmitter(this, ["candidate-add", "candidate-remove", "vote-add", "vote-remove"]);
    var publisher = new ProxyPublisher(publish, { pollId: this.id });

    this.candidates = observableVector([], publisher.publish.bind(publisher), "candidate");

    this.addCandidate = ({ name, link }) => {
        var c = candidateFactory({ name, link, ballot, publisher });
        this.candidates.add(c);
    };

    this.removeCandidate = ({ candidateId }) => {
        var candidate = _.findWhere(this.candidates, { id: candidateId });
        this.candidates.remove(candidate);
    };
}
