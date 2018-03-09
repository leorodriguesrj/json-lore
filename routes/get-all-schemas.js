const hal = require('hal');
const moment = require('moment');
const errors = require('restify-errors');
const schemas = require('../lib/data-schema');

function wrapCollectionInHal(obj) {
    const resource = hal.Resource({
        total: obj.length,
        at: moment()
    }, '/schema/');
    resource.link('pick', {href: '/schema/{id}', templated: true});
    resource.link('update', {href: '/schema/{id}', templated: true});
    resource.link('new', {href: '/schema/{id}', templated: true});
    resource.link('validate', {href: '/schema/{id}/instance', templated: true});
    resource.embed('items', obj, false);
    return resource;
}

module.exports = async function getAllSchemas(request, response, next) {
    try {
        const items = await schemas.findAll();
        response.send(wrapCollectionInHal(items));
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
};