const moment = require('moment');
const errors = require('restify-errors');
const schemas = require('../lib/data-schema');
const halWrapper = require('./hal-wrapper');

module.exports = async function getAllSchemas(request, response, next) {
    try {
        const items = await schemas.findAll();
        response.send(halWrapper.wrapSchemaCollection(items));
        next();
    } catch(error) {
        next(new errors.InternalError(error.message));
    }
};