class TypeError extends Error {
    constructor(message) {
        super(message);
        this.name = "TypeError";
    }
};

class CharaError extends Error {
    constructor(message) {
        super(message);
        this.name = "APIError";
    }
}

module.exports = { TypeError, CharaError };