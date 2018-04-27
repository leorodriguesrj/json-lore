const {Validator} = require('jsonschema');
const putPayloadSchema = require('./put-payload-schema.json');
const postPayloadSchema = require('./post-payload-schema.json');
const postInstancePayloadSchema =
    require('./post-instance-payload-schema.json');


function captalizeFistLetter(word) {
    const letters = word.split('');
    const first = letters.shift().toUpperCase();
    return `${first}${letters.join('')}`;
}

function convertIdToCamelCase(id) {
    const parts = id.split('-').filter(w => w !== '');
    const head = parts.shift();
    const tail = parts.map(captalizeFistLetter);
    return `${head}${tail.join('')}`;
}

const validator = new Validator();

validator.addSchema(putPayloadSchema, putPayloadSchema.id);
validator.addSchema(postPayloadSchema, postPayloadSchema.id);
validator.addSchema(postInstancePayloadSchema, postInstancePayloadSchema.id);

module.exports = {
    validator,
    convertIdToCamelCase,
    putPayloadSchema,
    postPayloadSchema,
    postInstancePayloadSchema
};