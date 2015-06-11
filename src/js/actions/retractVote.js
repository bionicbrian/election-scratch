"use strict";

import Q from "q";
import AppDispatcher from "../AppDispatcher";
import enums from "../enums";

export default function retractVote(candidateId) {
    AppDispatcher.handle({
        type: enums.RETRACT_VOTE,
        data: { candidateId }
    });

    return Q.resolve();
}
