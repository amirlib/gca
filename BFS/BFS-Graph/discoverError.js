class discoverError extends Error {
    constructor(message) {
        super(message);
        this.name = "DiscoverError";
    }
}

module.exports = discoverError;
