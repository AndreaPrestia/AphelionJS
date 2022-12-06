'use strict';

const http = require('http');
const jwt = require("jsonwebtoken");
const fs = require('fs');

const SecurityError = require('./errors/securityError');
const ResourceNotFoundError = require('./errors/resourceNotFoundError');
const ApiHandlerBase = require('./apiHandlerBase');
const ApiHandlerOutput = require('./apiHandlerOutput');

let _configuration = null;

let _firstRun = true;

class Aphelion {
    /**
     *
     * @param {number} port
     */
    useAphelion = (port) => http.createServer(async (req, res) => {
        await this.#process(req, res).catch(error => console.log(error));
    }).listen(port || process.env.PORT || 1337);

    #getResource = (url, method) => {
        let resource = _configuration.resources.find(x => x.url === url && x.method === method);

        if (!resource && !_firstRun) {
            _configuration = this.#loadConfiguration();
            resource = _configuration.resources.find(x => x.url === url && x.method === method);
        }

        _firstRun = false;

        console.log('Hi!')

        return resource;
    }

    #process = async (req, res) => {
        const rethrowOnError = this.#getElement('rethrowOnError');

        let content = '';

        let apiResult = null;

        let statusCode = 200;

        let contentType = "application/json";

        try {
            const resource = this.#getResource(req.url.split('?')[0], req.method);

            if (!resource) {
                throw new ResourceNotFoundError(`Resource ${req.url} ${req.method} NOT found.`);
            }

            const api = require(resource.class);

            if (!api.prototype instanceof ApiHandlerBase) {
                throw new Error(`Resource ${req.url} ${req.method} does not extends base class ApiHandlerBase.`);
            }

            const apiContext = {
                current: null
            };
            if (resource.claims) {
                const tokenContent = this.#verifyToken(req);

                if (!Object.keys(tokenContent)?.some(x => Object.keys(resource.claims)?.includes(x))) {
                    throw new SecurityError(`Resource ${req.url} ${req.method} is NOT accessible.`);
                }

                apiContext.current = tokenContent;
            }

            const apiInstance = Object.create(api.prototype);

            apiResult = await apiInstance.process(req, apiContext);

            if (!apiResult.prototype instanceof ApiHandlerOutput) {
                throw new Error('API result must be of type ApiHandlerOutput');
            }

            statusCode = apiResult.StatusCode;

            content = apiResult.Content;

            contentType = apiResult.ContentType;
        } catch (error) {
            if (error instanceof ResourceNotFoundError) {
                statusCode = 404;
            } else if (error instanceof SecurityError) {
                statusCode = 403;
            } else {
                statusCode = 500;
            }

            content = rethrowOnError ? error.message : 'An error has occurred :(';
        } finally {
            res.writeHead(statusCode, {'Content-Type': contentType});
            res.end(content);
        }
    }

    #loadConfiguration = () => {
        const rawData = fs.readFileSync('aphelion.json');

        return JSON.parse(rawData);
    }

    #verifyToken = (req) => {
        const token = req.headers['authorization'];

        if (!token) {
            throw new SecurityError('Authorization not provided');
        }

        try {
            return jwt.verify(token, this.#getElement('serverKey'));
        } catch (err) {
            throw new SecurityError('Invalid token');
        }
    }

    #getElement = (key) => {
        if (!_configuration) {
            _configuration = this.#loadConfiguration();
        }

        return _configuration[key]
    };
}

module.exports = (port) => new Aphelion().useAphelion(port);

