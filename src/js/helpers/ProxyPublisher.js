class ProxyPublisher {
    constructor(publisher, basePayload) {
        this.publisher = publisher;
        this.basePayload = basePayload || {};
    }

    extendPayload(obj) {
        this.basePayload = Object.assign({}, obj, this.basePayload);
    }

    publish(name, payload) {
        var pl = Object.assign({}, payload, this.basePayload);
        this.publisher(name, pl);
    }

    extend(obj) {
        var newPubber = Object.create(this);
        newPubber.extendPayload(obj);
        return newPubber;
    }
}

export default ProxyPublisher;
