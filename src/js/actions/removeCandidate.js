"use strict";

import Q from "q";
import AppDispatcher from "../AppDispatcher";

export default function removeCandidate(candidateId) {
    AppDispatcher.handle({
        type: enums.REMOVE_CANDIDATE,
        data: { candidateId }
    });

    return Q.resolve();
}
