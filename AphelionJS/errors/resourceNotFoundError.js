class ResourceNotFoundError extends Error {
    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, ResourceNotFoundError)
    }
}

module.exports = ResourceNotFoundError  
