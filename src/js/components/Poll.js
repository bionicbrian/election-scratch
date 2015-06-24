"use strict";

import React from "react";
import Candidate from "./Candidate";

var Poll = React.createClass({
    getInitialState() {
        return {
            isShowingVotes: false
        };
    },

    _unsubscribe() { }, // Implemented in componentDidMount

    componentDidMount() {
        this._unsubscribe = this.props.poll.onMatch(/^.*$/, () => this.forceUpdate());
    },

    componentWillUnmount() {
        this._unsubscribe();
    },

    addCandidate(event) {
        event.preventDefault();

        var name = this.refs.newCandidateName.getDOMNode().value;
        this.refs.newCandidateName.getDOMNode().value = "";

        var link = this.refs.newCandidateLink.getDOMNode().value;
        this.refs.newCandidateLink.getDOMNode().value = "";

        this.props.poll.addCandidate({ name, link });
    },

    toggleShowVotes() {
        this.setState({ isShowingVotes: !this.state.isShowingVotes });
    },

    render() {
        var poll = this.props.poll;
        var lis = poll.candidates.map((candidate) => (<Candidate key={candidate.id} isShowingVotes={this.state.isShowingVotes} candidate={candidate} />));

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
                <h3>Candidates:</h3>
                <button onClick={this.toggleShowVotes}>Toggle results view</button>
                <ul>{lis}</ul>
            </div>
        );
    }
});

export default Poll;
