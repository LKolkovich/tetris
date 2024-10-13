class EventEmitter {
    #listeners = {};

    subscribe(eventName, listener) {
        const subs = this.#listeners[eventName] ?? [];
        subs.push(listener);
        this.#listeners[eventName] = subs;
    }

    unsubscribe(eventName, listener) {
        const subs = this.#listeners[eventName];
        if (subs) {
            this.#listeners[eventName] = subs.filter(sub => sub !== listener);
        }
    }


    dispatch(eventName, arg) {
        if (this.#listeners[eventName]) {
            this.#listeners[eventName].forEach((listener) => listener(arg));
        }
    }
}

export default EventEmitter;