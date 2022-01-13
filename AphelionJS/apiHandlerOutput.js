const ValidatorHelper = require("./helpers/validatorHelper");

class ApiHandlerOutput {
    #content = '';
    #statusCode = 200;
    #contentType = "application/json";
    #cacheEnabled = false;

    get Content() { return this.#content; }
    get StatusCode() { return this.#statusCode; }
    get ContentType() { return this.#contentType; }
    get CacheEnabled() { return this.#cacheEnabled; }

    set Content(value) {
        ValidatorHelper.validateString(value, false);

        this.#content = value;
    }

    set StatusCode(value) {
        ValidatorHelper.validateNumber(value);

        this.#statusCode = value;
    }

    set ContentType(value) {
        ValidatorHelper.validateString(value);

        this.#contentType = value;
    }

    set CacheEnabled(value) {
        ValidatorHelper.validateBoolean(value);

        this.#cacheEnabled = value;
    }

    constructor(content, statusCode, contentType, cacheEnabled) {
        ValidatorHelper.validateString(content, false);
        ValidatorHelper.validateNumber(statusCode);
        ValidatorHelper.validateString(contentType);
        ValidatorHelper.validateBoolean(cacheEnabled);

        this.#content = content;
        this.#statusCode = statusCode;
        this.#contentType = contentType;
        this.#cacheEnabled;
    }
}

module.exports = ApiHandlerOutput;