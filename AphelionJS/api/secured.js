const ApiHandlerBase = require("../apiHandlerBase");

class Secured extends ApiHandlerBase {
    async process(req) {
        return this.getOutput('Hi!!! I\'m secured!');
    }
}

module.exports = Secured;