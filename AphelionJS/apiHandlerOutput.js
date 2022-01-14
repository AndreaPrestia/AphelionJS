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
        this.#content = value ? JSON.stringify(value) : '';
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

    /**
     * 
     * @param {any} content
     * @param {number} statusCode
     * @param {string} contentType
     * @param {boolean} cacheEnabled
     */
    constructor(content, statusCode = 200, contentType = "application/json", cacheEnabled = false) {
        if (statusCode)
            ValidatorHelper.validateNumber(statusCode);

        if (contentType)
            ValidatorHelper.validateString(contentType);

        if (cacheEnabled !== null && cacheEnabled !== undefined)
            ValidatorHelper.validateBoolean(cacheEnabled);

        this.#content = content ? JSON.stringify(content) : '';
        this.#statusCode = statusCode;
        this.#contentType = contentType;
        this.#cacheEnabled = cacheEnabled;
    }
}

module.exports = ApiHandlerOutput;