const putData = require('./put-data.json');
const {Validator} = require('jsonschema');

const validator = new Validator();

validator.addSchema(putData, putData.id);

module.exports = {validator, putData};