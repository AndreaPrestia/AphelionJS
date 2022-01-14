const url = require('url');
const http = require('http');
const ValidatorHelper = require('./helpers/validatorHelper');
const ApiHandlerOutput = require("./apiHandlerOutput");

class ApiHandlerBase {

    constructor() {
        throw new Error('You have to implement an extension of ApiHandlerBase!');
    }

    /**
     * 
     * @param {http.IncomingMessage} req
     */
    async getBody(req) {
        ValidatorHelper.validateObject(req, http.IncomingMessage.name);

        const buffers = [];

        for await (const chunk of req) {
            buffers.push(chunk);
        }

        const data = Buffer.concat(buffers).toString();

        return JSON.parse(data);
    }

    /**
     * 
     * @param {http.IncomingMessage} req
     * @param {string} key
     * @param {boolean} isMandatory
     */
    getParameter(req, key, isMandatory = true) {
        ValidatorHelper.validateObject(req, http.IncomingMessage.name);

        ValidatorHelper.validateString(key);

        const parameterValue = url.parse(req.url, true).query[key].toString();

        if (isMandatory && (!parameterValue || parameterValue === '')) {
            throw new Error(`Parameter ${key} not provided.`);
        }

        return parameterValue;
    }

    /**
    *
    * @param {any} content
    * @param {number} statusCode
    * @param {string} contentType
    * @param {boolean} cacheEnabled
    */
    getOutput(content, statusCode = 200, contentType = "application/json", cacheEnabled = false) {
        return new ApiHandlerOutput(content, statusCode, contentType, cacheEnabled);
    }

    async process() {
        throw new Error('You have to implement the method process!');
    }
}

module.exports = ApiHandlerBase;
