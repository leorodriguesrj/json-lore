const hal = require('hal');
const moment = require('moment');
const schemas = require('../lib/bus-schema');

function wrapSchema(id, schema, basePath = '/schema/') {
    const resource = hal.Resource({
        at: moment(), body: schema
    }, `${basePath}${id}`);
    resource.link('all', {href: basePath});
    return resource;
}

function wrapSchemaCollection(collection) {
    const resource = hal.Resource({
        total: collection.length,
        at: moment()
    }, '/schema/');
    resource.link('pick', {href: '/schema/{id}', templated: true});
    resource.link('update', {href: '/schema/{id}', templated: true});
    resource.link('new', {href: '/schema/{id}', templated: true});
    resource.link('validate', {href: '/schema/{id}/instance', templated: true});
    resource.embed('items', collection.map(s =>
        wrapSchema(schemas.inferId(s), s)), false);
    return resource;
}

function wrapValidationOutcome(id, outcome) {
    const resource = hal.Resource({
        at: moment(), body: outcome
    }, `/schema/${id}/instance`);
    resource.link('schema', {href: `/schema/${id}`});
    return resource;
}

module.exports = {wrapSchemaCollection, wrapSchema, wrapValidationOutcome};