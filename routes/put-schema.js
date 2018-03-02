const errors = require('restify-errors');
const schemas = require('../lib/data-schema');

module.exports = async function putSchema(request, response, next) {
    try {
        const id = request.params.id;
        const representation = request.body;
        await schemas.save(id, representation);
        response.send(representation);
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
};