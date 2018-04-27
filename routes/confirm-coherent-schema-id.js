const errors = require('restify-errors');
const schemas = require('../lib/bus-schema');

async function confirmCoherentSchemaId(request, response, next) {
    try {
        const bodyId = schemas.inferId(request.body.body);
        if (bodyId === '')
            return next();
        if (bodyId === request.params.id)
            return next();
        const message = 'Id in URL and "body" attrbute must match eachother.';
        next(new errors.ConflictError(message));
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
}

module.exports = confirmCoherentSchemaId;