const ApiHandlerBase = require("../apiHandlerBase");
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

        return this.getOutput(token);
    }
}

module.exports = Jwt;