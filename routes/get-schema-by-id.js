const errors = require('restify-errors');
const schemas = require('../lib/data-schema');

module.exports = async function getSchemaById(request, response, next) {
    try {
        const id = request.params.id;
        response.send(await schemas.findById(id));
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
};