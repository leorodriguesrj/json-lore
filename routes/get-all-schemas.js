const cache = require('../lib/data-cache');
const errors = require('restify-errors');

module.exports = async function getAllSchemas(request, response, next) {
    try {
        const items = await cache.findAll();
        response.send(items);
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
};