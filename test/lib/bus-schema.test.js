describe('lib/bus-schema', () => {
    describe('inferId', () => {
        it('Should return empty if schema is undefined');
        it('Should return empty if schema is null');
        it('Should return empty if schema has no id');
        it('Should return empty schema id is malformed');
        it('Should return the specified id');
    });
    describe('register', () => {
        it('Should save the schema');
        it('Should create a new validator');
        it('Should configure the new validator');
    });
    describe('validate', () => {
        it('Should find the specified schema');
        it('Should invoke the validator using the schema and instance');
        it('Should return the outcome of the validation process');
    });
    describe('reloadSchemas', () => {
        it('Should create a new validator');
        it('Should configure the new validator');
    });
});