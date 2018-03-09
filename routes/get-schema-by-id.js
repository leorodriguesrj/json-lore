const hal = require('hal');
const moment = require('moment');
const errors = require('restify-errors');
const schemas = require('../lib/data-schema');

function wrapSchemaInHal(id, schema) {
    const resource = hal.Resource({at: moment()}, `/schema/${id}`);
    resource.link('all', {href: '/schema/', templated: false});
    resource.embed('item', schema, false);
    return resource;
}

module.exports = async function getSchemaById(request, response, next) {
    try {
        const id = request.params.id;
        const schema = await schemas.pickById(id);
        const resource = wrapSchemaInHal(id, schema);
        response.send(resource);
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
};