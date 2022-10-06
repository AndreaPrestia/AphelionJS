const ApiHandlerBase = require("../apiHandlerBase");

class Free extends ApiHandlerBase {
    async process(req, ctx) {
        let body = await this.getBody(req);

        return this.getOutput(body);
    }
}

module.exports = Free;