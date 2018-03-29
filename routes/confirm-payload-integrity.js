const winston = require('winston');
const errors = require('restify-errors');
const {validator} = require('../lib/meta-schemas');

function confirmPayloadIntegrity(payloadSchema) {
    return function confirmIntegrity(request, response, next) {
        try {
            const outcome = validator.validate(request.body, payloadSchema);
            if (outcome.valid) {
                return next();
            }
            winston.warn('Malformed payload received:', outcome.toString());
            next(new errors.BadRequestError('Malformed payload.'));
        } catch(error) {
            next(new errors.InternalError(error.message));
        }
    };
}

module.exports = confirmPayloadIntegrity;