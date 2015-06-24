"use strict";

import React from "react";

var Candidate = React.createClass({
    castVote() {
        this.props.candidate.castVote();
    },

    retractVote() {
        this.props.candidate.retractVote();
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

        var voteTally = () => {
            var votesValue = this.props.candidate.votes.val.reduce((total, vote) => {
                return total + vote.value;
            }, 0);

            if (this.props.isShowingVotes) {
                return <span>| {votesValue} votes</span>;
            } else {
                return "";
            }
        };

        return (<li>{candidateName()} {voteTally()} | {action()}</li>);
    }
});

export default Candidate;
