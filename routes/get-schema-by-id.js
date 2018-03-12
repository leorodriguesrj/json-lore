const moment = require('moment');
const errors = require('restify-errors');
const schemas = require('../lib/data-schema');

const halWrapper = require('./hal-wrapper');

module.exports = async function getSchemaById(request, response, next) {
    try {
        const id = request.params.id;
        const schema = await schemas.pickById(id);
        const resource = halWrapper.wrapSchema(id, schema);
        response.send(resource);
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
};