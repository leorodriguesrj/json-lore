
const getSchemaById = require('./get-schema-by-id');
const getAllSchemas = require('./get-all-schemas');
const putSchema = require('./put-schema');
const postSchema = require('./post-schema');
const postSchemaInstance = require('./post-schema-instance');

const confirmSchemaExistsById = require('./confirm-schema-exists-by-id');
const confirmPayloadIntegrity = require('./confirm-payload-integrity');
const confirmCoherentSchemaId = require('./confirm-coherent-schema-id');

const {
    putPayloadSchema,
    postPayloadSchema,
    postInstancePayloadSchema
} = require('../lib/meta-schemas');

function mount(server) {

    server.get('/schema/',
        getAllSchemas);

    server.get('/schema/:id',
        confirmSchemaExistsById,
        getSchemaById);

    server.post('/schema/',
        confirmPayloadIntegrity(postPayloadSchema),
        postSchema);

    server.put('/schema/:id',
        confirmPayloadIntegrity(putPayloadSchema),
        confirmCoherentSchemaId,
        confirmSchemaExistsById,
        putSchema);

    server.post('/schema/:id/instance',
        confirmPayloadIntegrity(postInstancePayloadSchema),
        confirmSchemaExistsById,
        postSchemaInstance);

}

module.exports = {mount};