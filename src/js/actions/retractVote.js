"use strict";

import Q from "q";
import appDispatcher from "../appDispatcher";
import enums from "../enums";

export default function retractVote(candidateId) {
    appDispatcher.handle({
        type: enums.RETRACT_VOTE,
        data: { candidateId }
    });

    return Q.resolve();
}
