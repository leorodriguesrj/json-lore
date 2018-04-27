const errors = require('restify-errors');
const schemas = require('../lib/bus-schema');

const halWrapper = require('./hal-wrapper');

module.exports = async function postSchema(request, response, next) {
    try {
        const resource = request.body.resource;
        const id = schemas.inferId(resource);
        await schemas.register(id, resource);
        response.send(halWrapper.wrapSchema(id, resource));
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
};