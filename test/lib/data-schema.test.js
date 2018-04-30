describe('lib/data-schema', () => {
    describe('findAll', () => {
        it('Should load the three files listed by fs');
    });
    describe('pickById', () => {
        it('Should load the contents of file with id "z"');
        it('Should throw error from the underlying fs');
    });
    describe('exists', () => {
        it('Should find the file with id "x"');
    });
    describe('save', () => {
        it('Should write contents and finish without errors');
        it('Should throw exception containing fs error');
    });
});