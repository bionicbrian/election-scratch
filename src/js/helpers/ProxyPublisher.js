import _ from "underscore";

class ProxyPublisher {
    constructor(publisher, basePayload) {
        this.publisher = publisher;
        this.basePayload = basePayload || {};
    }

    extendPayload(obj) {
        this.basePayload = _.extend(obj, this.basePayload);
    }

    publish(name, payload) {
        var pl = _.extend(payload, this.basePayload);
        this.publisher(name, pl);
    }

    extend(obj) {
        var newPubber = Object.create(this);
        newPubber.extendPayload(obj);
        return newPubber;
    }
}

export default ProxyPublisher;
