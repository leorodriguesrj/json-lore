const errors = require('restify-errors');
const cache = require('../lib/data-cache');

module.exports = async function getSchemaById(request, response, next) {
    try {
        const id = request.params.id;
        response.send(await cache.findById(id));
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
};