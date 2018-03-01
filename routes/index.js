
const getSchemaById = require('./get-schema-by-id');
const getAllSchemas = require('./get-all-schemas');
const postSchema = require('./post-schema');

const confirmSchemaExistsById = require('./confirm-schema-exists-by-id');

function mount(server) {

    server.get('/schema',
        getAllSchemas);

    server.get('/schema/:id',
        confirmSchemaExistsById,
        getSchemaById);

    server.post('/schema/:id',
        postSchema);

}

module.exports = {mount}