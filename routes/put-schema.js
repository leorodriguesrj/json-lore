const errors = require('restify-errors');
const schemas = require('../lib/bus-schema');

const halWrapper = require('./hal-wrapper');

module.exports = async function putSchema(request, response, next) {
    try {
        const id = request.params.id;
        const representation = request.body.body;
        await schemas.register(id, representation);
        response.send(halWrapper.wrapSchema(id, representation));
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
};