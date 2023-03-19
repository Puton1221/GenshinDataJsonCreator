class TypeError extends Error {
    constructor(message) {
        super(message);
        this.name = "TypeError";
    }
};

class APIError extends Error {
    constructor(message) {
        super(message);
        this.name = "APIError";
    }
}

module.exports = { TypeError, APIError };