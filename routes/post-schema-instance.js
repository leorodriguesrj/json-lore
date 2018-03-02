const errors = require('restify-errors');
const schemas = require('../lib/bus-schema');

module.exports = async function postSchemaInstance(request, response, next) {
    try {
        const instance = request.body;
        const outcome = await schemas.validate(request.params.id, instance);
        response.send(outcome);
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
};