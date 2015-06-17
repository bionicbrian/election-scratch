"use strict";

import Q from "q";
import _ from "underscore";
import { makeEmitter } from "pubit-as-promised";

export default function Candidate(name, link, ballot, gateway) {
    this.id = _.uniqueId("candidate_");
    this.name = name;
    this.link = link || "";

    var publish = makeEmitter(this, ["cast-vote", "retract-vote"]);

    // THIS IS LOCAL DOMAIN INFO, NOT FOR SERVER
    this.hasLocalVote = false;

    this.votes = [];

    this.castVote = () => {
        var vote;
        var value = 1;
        var userVoteExists = this.votes.some((vote) => vote.ballotId === ballot.id);

        if (!userVoteExists) {
            this.hasLocalVote = true;
            vote = { value, ballotId: ballot.id };
            this.votes.push(vote);
        }

        publish("cast-vote", vote);
        gateway.addVote({ id: this.id, vote });
        return Q.resolve();
    };

    this.retractVote = () => {
        var newVotes = _.reject(this.votes, (vote) => {
            var hasLocalVote = vote.ballotId === ballot.id;
            if (hasLocalVote) {
                this.hasLocalVote = false;
            }
            return hasLocalVote;
        });

        gateway.removeVote({ id: this.id, ballotId: ballot.id });
        publish("retract-vote", ballot.id);
        this.votes = newVotes;
    };
}
