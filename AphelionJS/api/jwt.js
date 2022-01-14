const ApiHandlerBase = require("../apiHandlerBase");
const ApiHandlerOutput = require("../apiHandlerOutput");
const jwt = require("jsonwebtoken");

class Jwt extends ApiHandlerBase {
    async process(req) {
        const token = jwt.sign(
            { roles: ['users'] },
            "ForzaSilvio666%$",
            {
                expiresIn: "2h",
            }
        );

        return new ApiHandlerOutput(token);
    }
}

module.exports = Jwt;