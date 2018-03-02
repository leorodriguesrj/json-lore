const errors = require('restify-errors');
const schemas = require('../lib/data-schema');

async function confirmSchemaExistsById(request, response, next) {
    const id = request.params.id;
    try {
        if (await schemas.exists(id)) {
            return next();
        }
        next(new errors.NotFoundError(`Schema '${id}' not found.`));
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
}

module.exports = confirmSchemaExistsById;