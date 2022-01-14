const ApiHandlerBase = require("../apiHandlerBase");
const ApiHandlerOutput = require("../apiHandlerOutput");

class Free extends ApiHandlerBase {
    async process(req) {
        let body = await this.getBody(req);

        return new ApiHandlerOutput(body);
    }
}

module.exports = Free;