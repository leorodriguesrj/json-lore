describe('routes/hal-wrapper', () => {
    describe('wrapSchema', () => {
        it('Should return a resource with property "body".');
        it('Should return a resource with the timestamp of operation.');
        it('Should return a resource with the "self" link.');
        it('Should return a resource with the "all" link.');
    });
    describe('wrapSchemaCollection', () => {
        it('Should return a resource with the collection embedded.');
        it('Should return a resource with the total number of items.');
        it('Should return a resource with the timestamp of operation.');
        it('Should return a resource with the "self" link.');
        it('Should return a resource with the "pick" link.');
        it('Should return a resource with the "update" link.');
        it('Should return a resource with the "new" link.');
        it('Should return a resource with the "validate" link.');
    });
    describe('wrapValidationOutcome', () => {
        it('Should return a resource with a "body".');
        it('Should return a resource with the timestamp of operation.');        
        it('Should return a resource with the "schema" link.');
    });
});