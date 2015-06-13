"use strict";

import _ from "underscore";

export default function Candidate({ name, link }) {
    this.id = _.uniqueId("candidate_");
    this.name = name;
    this.link = link || "";

    this.hasLocalVote = false;

    this.votes = [];
}
