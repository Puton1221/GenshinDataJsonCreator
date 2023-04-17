class APIError extends Error {
    constructor(message) {
        super(message);
        this.name = "APIError";
    }
}

module.exports = { APIError };