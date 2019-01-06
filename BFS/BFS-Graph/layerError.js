class layerError extends Error {
    constructor(message) {
        super(message);
        this.name = "LayerError";
    }
}

module.exports = layerError;
