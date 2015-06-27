import Poll from "../../src/js/models/Poll";

var candidateStub;

var candidateFactory = ({ name, link }) => {
    candidateStub = {
        name,
        link: link || "",
        id: 123,
        votes: []
    };

    return candidateStub;
};

describe("Poll Model", function () {
    beforeEach(function () {
        this.poll = new Poll({ candidateFactory, ballot: { id: 123 } });
    });

    it("should respond to some methods", function () {
        this.poll.should.respondTo("addCandidate");
        this.poll.should.respondTo("removeCandidate");
    });

    describe("Candidate events", function () {
        describe("Candidate add", function () {
            beforeEach(function () {
                this.addSpy = sinon.stub();
                this.poll.on("candidate-add", this.addSpy.bind(this));
                this.poll.addCandidate({ name: "Brian" });
            });

            it("The candidate-add listener is called with correct payload", function () {
                this.addSpy.should.have.been.calledWith({ candidate: candidateStub, pollId: "poll_2" });
            });
        });

        describe("Candidate remove", function () {
            beforeEach(function () {
                this.removeSpy = sinon.stub();
                this.poll.on("candidate-remove", this.removeSpy.bind(this));
                this.poll.addCandidate({ name: "Brian" });
                this.poll.removeCandidate({ candidateId: 123 });
            });

            it("The candidate-remove listener is called with correct payload", function () {
                this.removeSpy.should.have.been.calledWith({ candidate: candidateStub, pollId: "poll_3" });
            });
        });
    });
});
