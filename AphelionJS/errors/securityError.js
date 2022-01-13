class SecurityError extends Error {
    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, SecurityError)
    }
}

module.exports = SecurityError  
