const errors = require('restify-errors');
const cache = require('../lib/data-cache');

module.exports = function getSchemaById(request, response, next) {
    try {
        const id = request.params.id;
        response.send(cache.loadById(id));
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
}