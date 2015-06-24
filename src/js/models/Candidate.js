"use strict";

import Q from "q";
import _ from "underscore";
import { makeEmitter } from "pubit-as-promised";
import observableVector from "../helpers/observableVector";

const DEFAULT_VOTE_VALUE = 1;

export default function Candidate({ name, link, ballot, publisher: parentPublisher }) {
    this.id = _.uniqueId("candidate_");
    this.link = link || "";
    this.name = name;
    this.votes = [];

    var publisher = parentPublisher.extend({ candidateId: this.id });

    this.castVote = () => {
        var vote;
        if (!this.hasLocalVote) {
            vote = { value: DEFAULT_VOTE_VALUE, ballotId: ballot.id };
            this.votes.push(vote);
            publisher.publish("vote-add", vote);
        }
    };

    this.retractVote = () => {
        var vote = _.findWhere(this.votes, { ballotId: ballot.id });
        this.votes.splice(this.votes.indexOf(vote), 1);
        publisher.publish("vote-remove", vote);
    };


    Object.defineProperties(this, {
        "hasLocalVote": {
            get() {
                return this.votes.some((vote) => vote.ballotId === ballot.id);
            }
        }
    });
}
