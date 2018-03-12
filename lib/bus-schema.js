const {Validator} = require('jsonschema');
const schemas = require('./data-schema');

let validator = new Validator();

function describeOutcome(outcome) {
    if (outcome.valid) {
        return {valid: true};
    }
    const errors = outcome.errors.map(e => e.toString());
    return {valid: false, errors};
}

function inferId(schema) {
    if (!schema) return '';
    if (!schema.id) return '';
    const match = /.*(\/(\w+(-\w+)*))$/.exec(schema.id);
    if (!match) return '';
    return match[2];
}

async function register(id, schema) {
    await schemas.save(id, schema);
    await reloadSchemas();
}

async function validate(id, instance) {
    const schema = await schemas.pickById(id);
    const outcome = validator.validate(instance, schema);
    return describeOutcome(outcome);
}

async function reloadSchemas() {
    validator = new Validator();
    const allSchemas = await schemas.findAll();
    allSchemas.forEach(s => validator.addSchema(s, s.id));
}

module.exports = {inferId, register, validate, reloadSchemas};