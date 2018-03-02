const errors = require('restify-errors');
const schemas = require('../lib/data-schema');

module.exports = async function getAllSchemas(request, response, next) {
    try {
        const items = await schemas.findAll();
        response.send(items);
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
};