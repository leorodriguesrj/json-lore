const winston = require('winston');
const errors = require('restify-errors');
const {validator} = require('../lib/meta-schemas');

function confirmPayloadIntegrity(payloadSchema) {
    return function confirmIntegrity(request, response, next) {
        const outcome = validator.validate(request.body, payloadSchema);
        if (!outcome.valid) {
            winston.warn('Malformed document received:', outcome.toString());
            return next(new errors.BadRequestError('Malformed document.'));
        }
        next();
    } 
}

module.exports = confirmPayloadIntegrity;