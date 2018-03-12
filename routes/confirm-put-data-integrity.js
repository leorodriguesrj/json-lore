const winston = require('winston');
const errors = require('restify-errors');
const {validator, putData} = require('../lib/meta-schemas');

function confirmPutDataIntegrity(request, response, next) {
    const outcome = validator.validate(request.body, putData);
    if (!outcome.valid) {
        winston.warn('Malformed document received:', outcome.toString());
        return next(new errors.BadRequestError('Malformed document.'));
    }
    next();
}

module.exports = confirmPutDataIntegrity;