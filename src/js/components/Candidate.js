"use strict";

import React from "react";
import castVote from "../actions/castVote";
import retractVote from "../actions/retractVote";

var Candidate = React.createClass({
    castVote() {
        var value = 1;
        castVote(this.props.candidate.id, value);
    },

    retractVote() {
        retractVote(this.props.candidate.id);
    },

    render() {
        var action = () => {
            if (this.props.candidate.hasLocalVote) {
                return <button onClick={this.retractVote}>Retract Vote</button>
            } else {
                return <button onClick={this.castVote}>Cast Vote</button>
            }
        };

        // If the candidate has a link we need different markup
        var candidateName = () => {
            if (this.props.candidate.link) {
                return <b><a href={this.props.candidate.link} target="_blank">{this.props.candidate.name}</a></b>
            } else {
                return <b>{this.props.candidate.name}</b>
            }
        };

        var votesValue = this.props.candidate.votes.reduce((total, vote) => {
            return total + vote.value;
        }, 0);

        return (<li>{candidateName()} | {votesValue} votes | {action()}</li>);
    }
});

export default Candidate;
