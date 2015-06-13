"use strict";

import Q from "q";
import appDispatcher from "../appDispatcher";

export default function removeCandidate(candidateId) {
    appDispatcher.handle({
        type: enums.REMOVE_CANDIDATE,
        data: { candidateId }
    });

    return Q.resolve();
}
