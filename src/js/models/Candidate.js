"use strict";

import Q from "q";
import _ from "underscore";
import enums from "../enums";
import { makeEmitter } from "pubit-as-promised";

export default function Candidate(name, link, ballot, publishChange) {
    this.hasLocalVote = false; // THIS IS LOCAL DOMAIN INFO, NOT FOR SERVER

    var votes = [];

    this.castVote = () => {
        var vote;
        var value = 1;
        var userVoteExists = this.votes.some((vote) => vote.ballotId === ballot.id);

        if (!userVoteExists) {
            this.hasLocalVote = true;
            vote = { value, ballotId: ballot.id };
            votes.push(vote);
            publishChange({
                type: enums.ADD_VOTE,
                payload: { candidateId: this.id, vote }
            });
        }
    };

    this.retractVote = () => {
        var newVotes = _.reject(this.votes, (vote) => {
            var hasLocalVote = vote.ballotId === ballot.id;
            if (hasLocalVote) {
                this.hasLocalVote = false;
            }
            return hasLocalVote;
        });

        this.votes = newVotes;

        publishChange({
            type: enums.REMOVE_VOTE,
            payload: { candidateId: this.id, ballotId: ballot.id }
        });
    };

    Object.defineProperties(this, {
        "id": {
            get() {
                return _.uniqueId("candidate_");
            }
        },
        "name": {
            get() {
               return name;
            }
        },
        "link": {
            get() {
                return link || "";
            }
        },
        "votes": {
            get() {
                return votes;
            }
        }
    });
}
