class TypeError extends Error {
    constructor(message) {
        super(message);
        this.name = "TypeError";
    }
};

class CharaError extends Error {
    constructor(message) {
        super(message);
        this.name = "Error";
    }
}

module.exports = { TypeError, CharaError };