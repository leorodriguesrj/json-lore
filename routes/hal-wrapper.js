const hal = require('hal');
const moment = require('moment');
const schemas = require('../lib/bus-schema');

function wrapSchema(id, schema) {
    const resource = hal.Resource({
        at: moment(), body: schema
    }, `/schema/${id}`);
    resource.link('all', {href: '/schema/'});
    return resource;
}

function wrapSchemaCollection(collection) {
    const resource = hal.Resource({
        total: collection.length,
        at: moment()
    }, '/schema/');
    const getId = s => s.
    resource.link('pick', {href: '/schema/{id}', templated: true});
    resource.link('update', {href: '/schema/{id}', templated: true});
    resource.link('new', {href: '/schema/{id}', templated: true});
    resource.link('validate', {href: '/schema/{id}/instance', templated: true});
    resource.embed('items', collection.map(s =>
        wrapSchema(schemas.inferId(s), s)), false);
    return resource;
}

module.exports = {wrapSchemaCollection, wrapSchema};