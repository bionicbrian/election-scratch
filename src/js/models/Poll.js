import Q from "q";
import md5 from "MD5";
import { makeEmitter } from "pubit-as-promised";
import observableVector from "../helpers/observableVector";
import ProxyPublisher from "../helpers/ProxyPublisher";

export default function Poll({ candidateFactory, ballot }) {
    this.id = md5("candidate" + Date.now());

    var publish = makeEmitter(this, ["candidate-add", "candidate-remove", "vote-add", "vote-remove"]);
    var publisher = new ProxyPublisher(publish, { pollId: this.id });
    var publishWithPollId = publisher.publish.bind(publisher);

    this.candidates = observableVector([], publishWithPollId, "candidate");

    this.addCandidate = ({ name, link }) => {
        var candidate = candidateFactory({ name, link, ballot, publisher });
        this.candidates.add(candidate);
        return Q.resolve(Object.assign({}, publisher.basePayload, { candidate }));
    };

    this.removeCandidate = ({ candidateId }) => {
        var candidate = _.findWhere(this.candidates, { id: candidateId });
        this.candidates.remove(candidate);
        return Q.resolve(Object.assign({}, publisher.basePayload, { candidate }));
    };
}
