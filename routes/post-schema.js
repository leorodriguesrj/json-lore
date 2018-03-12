const errors = require('restify-errors');
const schemas = require('../lib/bus-schema');

const halWrapper = require('./hal-wrapper');

module.exports = async function postSchema(request, response, next) {
    try {
        const representation = request.body.body;
        const id = schemas.inferId(representation);
        await schemas.register(id, representation);
        response.send(halWrapper.wrapSchema(id, representation));
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
};