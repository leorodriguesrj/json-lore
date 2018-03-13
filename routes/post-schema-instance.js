const errors = require('restify-errors');
const schemas = require('../lib/bus-schema');

const halWrapper = require('./hal-wrapper');

module.exports = async function postSchemaInstance(request, response, next) {
    try {
        const id = request.params.id;
        const instance = request.body.body;
        const outcome = await schemas.validate(id, instance);
        response.send(halWrapper.wrapValidationOutcome(id, outcome));
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
};