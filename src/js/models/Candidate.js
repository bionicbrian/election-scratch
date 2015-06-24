"use strict";

import Q from "q";
import _ from "underscore";
import { makeEmitter } from "pubit-as-promised";
import observableVector from "../helpers/observableVector";

const DEFAULT_VOTE_VALUE = 1;

export default function Candidate({ name, link, ballot, publisher: parentPublisher }) {
    var id = _.uniqueId("candidate_");
    link = link || "";

    var publisher = parentPublisher.extend({ candidateId: this.id });
    var votes = observableVector([], publisher.publish.bind(publisher), "candidate");

    this.castVote = () => {
        var vote;

        if (!this.hasLocalVote) {
            this.hasLocalVote = true;
            votes.add({ value: DEFAULT_VOTE_VALUE, ballotId: ballot.id });
        }
    };

    this.retractVote = ({ voteId }) => {
        var vote = _.findWhere(votes.val, { id: voteId });
        votes.remove(vote);
    };

    Object.defineProperties(this, {
        "id": {
            get() {
                return id;
            }
        },
        "name": {
            get() {
               return name;
            }
        },
        "link": {
            get() {
                return link;
            }
        },
        "votes": {
            get() {
                return votes;
            }
        },
        "hasLocalVote": {
            get() {
                return votes.some((vote) => vote.ballotId === ballot.id);
            }
        }
    });
}
