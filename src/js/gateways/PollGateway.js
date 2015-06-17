"use strict";

export default function PollGateway(socket) {
    var makeEmitter = (type) => (data) => {
        socket.emit(type, data)
    };

    this.addCandidate = makeEmitter("candidate-add");
    this.updateCandidate = makeEmitter("candidate-update");
    this.removeCandidate = makeEmitter("candidate-remove");

    this.addVote = makeEmitter("vote-add");
    this.removeVote = makeEmitter("vote-remove");
};
