const ApiHandlerBase = require("../apiHandlerBase");
const ApiHandlerOutput = require("../apiHandlerOutput");

class Secured extends ApiHandlerBase {
    async process(req) {
        const paramerResult = this.getParameter(req, 'dio');

        return new ApiHandlerOutput('Hi!!! I\'m secured! ' + paramerResult);
    }
}

module.exports = Secured;