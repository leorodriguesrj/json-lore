const errors = require('restify-errors');
const metaSchemas = require('../lib/meta-schemas');
const halWrapper = require('./hal-wrapper');

module.exports = function getMetaSchema(request, response, next) {
    try {
        const id = request.params.id;
        const attibuteName = `${metaSchemas.convertIdToCamelCase(id)}Schema`;
        const schema = metaSchemas[attibuteName];
        const body = halWrapper.wrapSchema(id, schema, '/meta-schema/');
        response.send(body);
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
};