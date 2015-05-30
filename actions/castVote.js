"use strict";

import Q from "q";
import AppDispatcher from "../AppDispatcher";

export default function castVote(candidateId, value) {
    AppDispatcher.handle({
        type: enums.CAST_VOTE,
        data: { candidateId, value }
    });

    return Q.resolve();
}
