import Poll from "../models/Poll";

var candidateFactory = sinon.stub();
var ballot = {
    id: 123
};

describe("Poll Model", function () {
    beforeEach(function () {
        this.poll = new Poll({ candidateFactory, ballot })
    });

    it("should adhere to the required interface", function () {
        this.poll.should.respondTo("addCandidate");
        this.poll.should.respondTo("removeCandidate");
    });

    describe("Poll events", function () {
        beforeEach(function () {
            var publisherSpy = sinon.spy(this.poll, "on");
            this.poll.addCandidate({ name: "Brian" })
        });

        it("should publish a change when a candidate is added", function () {
            publisherSpy.should.have.been.called;
        });
    })
});
