const errors = require('restify-errors');
const schemas = require('../lib/bus-schema');

const halWrapper = require('./hal-wrapper');

module.exports = async function putSchema(request, response, next) {
    try {
        const id = request.params.id;
        const resource = request.body.resource;
        await schemas.register(id, resource);
        response.send(halWrapper.wrapSchema(id, resource));
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
};