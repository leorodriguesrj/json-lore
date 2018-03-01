
const getSchemaById = require('./get-schema-by-id');
const getAllSchemas = require('./get-all-schemas');

const confirmSchemaExistsById = require('./confirm-schema-exists-by-id');

function mount(server) {

    server.get('/schema',
        getAllSchemas);

    server.get('/schema/:id',
        confirmSchemaExistsById,
        getSchemaById);

}

module.exports = {mount}