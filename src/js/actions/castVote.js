"use strict";

import Q from "q";
import enums from "../enums";
import appDispatcher from "../appDispatcher";

export default function castVote(candidateId, value) {
    appDispatcher.handle({
        type: enums.CAST_VOTE,
        data: { candidateId, value }
    });

    return Q.resolve();
}
