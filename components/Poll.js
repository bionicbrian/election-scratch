"use strict";

import React from "react";
import Candidate from "./Candidate";
import addCandidate from "../actions/addCandidate";
import pollStore from "../stores/Poll";

var Poll = React.createClass({
    componentDidMount() {
        pollStore.on("CHANGE", () => this.forceUpdate());
    },

    componentWillUnmount() {
        pollStore.off("CHANGE", () => this.forceUpdate());
    },

    addCandidate(event) {
        event.preventDefault();

        var candidateName = this.refs.newCandidateName.getDOMNode().value;
        this.refs.newCandidateName.getDOMNode().value = "";

        var candidateLink = this.refs.newCandidateLink.getDOMNode().value;
        this.refs.newCandidateLink.getDOMNode().value = "";

        addCandidate(candidateName, candidateLink);
    },

    render() {
        var poll = this.props.poll;
        var lis = poll.candidates.map((candidate) => (<Candidate key={candidate.id} candidate={candidate} />));

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h1>Poll</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h4>Add a candidate</h4>
                        <form className="form-inline" onSubmit={this.addCandidate}>
                            <input className="form-control" type="text" ref="newCandidateName" placeholder="Name" /><br/>
                            <input type="text" className="form-control" ref="newCandidateLink" placeholder="Link (http://...)" /><br/>
                            <button className="btn btn-default">Add Candidate</button>
                        </form>
                    </div>
                </div>
                <p>This poll has {this.props.poll.ballots.length} ballots</p>
                <h3>Candidates:</h3>
                <ul>{lis}</ul>
            </div>
        );
    }
});

export default Poll;
