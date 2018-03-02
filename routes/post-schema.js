const errors = require('restify-errors');
const cache = require('../lib/data-cache');

module.exports = async function postSchema(request, response, next) {
    try {
        const id = request.params.id;
        const representation = request.body;
        await cache.save(id, representation);
        response.send(representation);
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
};