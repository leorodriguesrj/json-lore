const errors = require('restify-errors');
const metaSchemas = require('../lib/meta-schemas');

function confirmMetaSchemaExists(request, response, next) {
    const id = metaSchemas.convertIdToCamelCase(request.params.id);
    try {
        if (metaSchemas.hasOwnProperty(`${id}Schema`)) {
            return next();
        }
        next(new errors.NotFoundError(`Metaschema '${id}' not found.`));
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
}

module.exports = confirmMetaSchemaExists;