import R from "ramda";

var syncCandidate = (payload) => {
    console.log("syncing candidate");
    console.dir(payload);
};

var candidateMapper = (payload) => {
    var candidateData = R.pick(["id", "name", "link", "votes"], payload.candidate);
    var votesData = candidateData.votes.map(vote => R.pick(["value", "ballotId"], vote));

    payload.candidate = candidateData;
    payload.candidate.votes = votesData;

    return payload;
};

export default function addCandidate(poll, candidateSpec) {
    poll.addCandidate(candidateSpec)
        .then(candidateMapper)
        .done(syncCandidate);
}
