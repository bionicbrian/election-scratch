import Q from "q";
import md5 from "MD5";
import { makeEmitter } from "pubit-as-promised";
import observableVector from "../helpers/observableVector";

const DEFAULT_VOTE_VALUE = 1;

export default function Candidate({ name, link, ballot, publisher: parentPublisher }) {
    this.id = md5(name + Date.now());
    this.link = link || "";
    this.name = name;

    var publisher = parentPublisher.extend({ candidateId: this.id });
    var publishWithCandidateId = publisher.publish.bind(publisher);

    this.votes = observableVector([], publishWithCandidateId, "candidate");

    this.castVote = () => {
        var vote;
        if (!this.hasLocalVote) {
            vote = { value: DEFAULT_VOTE_VALUE, ballotId: ballot.id }
            this.votes.add(vote);
            return Q.resolve(Object.assign({}, publisher.basePayload, vote));
        }

        return Q.reject();
    };

    this.retractVote = () => {
        var vote = _.findWhere(this.votes, { ballotId: ballot.id });
        this.votes.remove(vote);
        return Q.resolve(Object.assign({}, publisher.basePayload, vote));
    };


    Object.defineProperties(this, {
        "hasLocalVote": {
            get() {
                return this.votes.some((vote) => vote.ballotId === ballot.id);
            }
        }
    });
}
