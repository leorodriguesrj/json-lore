
const getSchemaById = require('./get-schema-by-id');
const getAllSchemas = require('./get-all-schemas');
const putSchema = require('./put-schema');
const postSchemaInstance = require('./post-schema-instance');

const confirmSchemaExistsById = require('./confirm-schema-exists-by-id');
const confirmPutDataIntegrity = require('./confirm-put-data-integrity');
const confirmCoherentSchemaId = require('./confirm-coherent-schema-id');

function mount(server) {

    server.get('/schema/',
        getAllSchemas);

    server.get('/schema/:id',
        confirmSchemaExistsById,
        getSchemaById);

    server.put('/schema/:id',
        confirmPutDataIntegrity,
        confirmCoherentSchemaId,
        confirmSchemaExistsById,
        putSchema);

    server.post('/schema/:id/instance',
        confirmSchemaExistsById,
        postSchemaInstance);

}

module.exports = {mount};