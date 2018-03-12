const {Validator} = require('jsonschema');
const putPayloadSchema = require('./put-payload-schema.json');
const postPayloadSchema = require('./post-payload-schema.json');

const validator = new Validator();

validator.addSchema(putPayloadSchema, putPayloadSchema.id);
validator.addSchema(postPayloadSchema, postPayloadSchema.id);

module.exports = {validator, putPayloadSchema, postPayloadSchema};