const cache = require('../lib/data-cache');
const errors = require('restify-errors');

async function confirmSchemaExistsById(request, response, next) {
    const id = request.params.id;
    try {
        if (await cache.exists(id)) {
            return next();
        }
        next(new errors.NotFoundError(`Schema '${id}' not found.`));
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
}

module.exports = confirmSchemaExistsById;