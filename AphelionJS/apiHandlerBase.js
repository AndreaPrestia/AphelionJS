const ApiHandlerOutput = require("./apiHandlerOutput");

class ApiHandlerBase {

    constructor() {
        throw new Error('You have to implement an extension of ApiHandlerBase!');
    }

    async deserializeInput(req) {
        const buffers = [];

        for await (const chunk of req) {
            buffers.push(chunk);
        }

        const data = Buffer.concat(buffers).toString();

        return JSON.parse(data);
    }

    getOutput(content, statusCode = 200, contentType = "application/json", cacheEnabled = false) {
        return new ApiHandlerOutput(JSON.stringify(content), statusCode, contentType, cacheEnabled);
    }

    async process() {
        throw new Error('You have to implement the method process!');
    }
}

module.exports = ApiHandlerBase;
