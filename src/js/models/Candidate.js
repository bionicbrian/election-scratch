"use strict";

import _ from "underscore";
import { makeEmitter } from "pubit-as-promised";
import observableVector from "../helpers/observableVector";

const DEFAULT_VOTE_VALUE = 1;

export default function Candidate({ name, link, ballot, publisher: parentPublisher }) {
    this.id = _.uniqueId("candidate_");
    this.link = link || "";
    this.name = name;

    var publisher = parentPublisher.extend({ candidateId: this.id });
    var publishWithCandidateId = publisher.publish.bind(publisher);

    this.votes = observableVector([], publishWithCandidateId, "candidate");

    this.castVote = () => {
        if (!this.hasLocalVote) {
            this.votes.add({ value: DEFAULT_VOTE_VALUE, ballotId: ballot.id });
        }
    };

    this.retractVote = () => {
        var vote = _.findWhere(this.votes, { ballotId: ballot.id });
        this.votes.remove(vote);
    };


    Object.defineProperties(this, {
        "hasLocalVote": {
            get() {
                return this.votes.some((vote) => vote.ballotId === ballot.id);
            }
        }
    });
}
