class ExpressError extends Error {
    constructor(message, statusCode) {
        //calls Error constructor
        super();
        //defines on top of Error
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;