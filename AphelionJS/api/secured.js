const ApiHandlerBase = require("../apiHandlerBase");

class Secured extends ApiHandlerBase {
    async process(req, ctx) {
        const paramerResult = this.getParameter(req, 'dio');

        return this.getOutput('Hi!!! I\'m secured! ' + paramerResult);
    }
}

module.exports = Secured;