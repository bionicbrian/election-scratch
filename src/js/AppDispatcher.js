"use strict";

var appDispatcher = {
    callbacks: [],
    register(callback) {
        this.callbacks.push(callback);
    },
    handle(data) {
        this.callbacks.forEach((cb) => cb(data));
    }
};

export default appDispatcher;
