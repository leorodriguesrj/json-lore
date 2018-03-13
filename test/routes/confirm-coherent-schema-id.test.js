describe('routes/confirm-coherent-schema-id', () => {
    it('Should continue to next step if body has no "id"');
    it('Should continue to next step if body and URI have the same "id"');
    it('Should fail with "409 Conflict" if "body.id" differs from URL\'s "id"');
    it('Should fail with "500 Internal error" in case of exception');
});