"use strict";

import Q from "q";
import AppDispatcher from "../AppDispatcher";
import enums from "../enums";

export default function addCandidate(name, link) {
    if (/* validation fails */false) {
        return Q.reject(new Error("Invalid canidate entry"));
    } else {
        AppDispatcher.handle({
            type: enums.ADD_CANDIDATE,
            data: { name, link }
        });

        return Q.resolve();
    }
}
