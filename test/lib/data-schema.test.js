
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));

const sandbox = sinon.createSandbox();

const readdirAux = sandbox.stub();
const readFileAux = sandbox.stub();

const dataSchema = proxyquire('../../lib/data-schema', {
    'fs': {
        'readdir': (path, callback) => {
            const {error, data} = readdirAux(path);
            callback(error, data);
        },
        'readFile': (path, callback) => {
            const {error, data} = readFileAux(path);
            callback(error, data);
        }
    }
});

describe('lib/data-schema', () => {
    describe('findAll', () => {
        afterEach(() => sandbox.reset());
        it('Should load the two files listed by fs', async () => {
            readdirAux.returns({
                error: undefined, data: ['schema1.json', 'schema2.json']
            });

            readFileAux.onCall(0).returns({
                error: undefined, data: '{"someName": "someValue"}'
            });

            readFileAux.onCall(1).returns({
                error: undefined, data: '{"anotherName": "anotherValue"}'
            });

            const schemas = await dataSchema.findAll();

            expect(readdirAux).to.be.calledOnce;
            expect(readFileAux).to.be.calledTwice;
            expect(schemas).to.be.deep.equals([
                { someName: 'someValue' },
                { anotherName: 'anotherValue' }
            ]);
        });
        it('Should throw if cache listing fails', () => {
            readdirAux.returns({ error: 'fake error', data: undefined });

            return dataSchema.findAll()
                .then(() => {
                    return Promise.reject('This call should not succeed!');
                })
                .catch(error => {
                    expect(error).to.be.equal('fake error');
                    expect(readdirAux).to.be.calledOnce;
                    expect(readFileAux).to.not.be.called;
                });
        });
        it('Should throw if at least one file fails to load', () => {
            readdirAux.returns({
                error: undefined, data: ['schema1.json', 'schema2.json']
            });

            readFileAux.onCall(0).returns({
                error: undefined, data: '{"someName": "someValue"}'
            });

            readFileAux.onCall(1).returns({
                error: 'fake error', data: undefined
            });

            return dataSchema.findAll()
                .then(() => {
                    return Promise.reject('This call should not succeed!');
                })
                .catch(error => {
                    expect(error).to.be.equal('fake error');
                    expect(readdirAux).to.be.calledOnce;
                    expect(readFileAux).to.be.calledTwice;
                });
        });
    });
    describe('pickById', () => {
        afterEach(() => sandbox.reset());
        it('Should load the contents of file with id "z"', async () => {
            readFileAux.returns({
                error: undefined, data: '{"oneOtherName": "oneOtherValue"}'
            });
            const schema = await dataSchema.pickById('someSchema');
            expect(schema).to.be.deep.equals({oneOtherName: 'oneOtherValue'});
        });
        it('Should throw error from the underlying fs', () => {
            readFileAux.returns({
                error: 'fake error', data: undefined
            });
            return dataSchema.pickById('someSchema')
                .then(() => {
                    return Promise.reject('This call should not succeed!');
                })
                .catch(error => {
                    expect(error).to.be.equal('fake error');
                    expect(readFileAux).to.be.calledOnce;
                });
        });
    });
    describe('exists', () => {
        it('Should find the file with id "x"');
    });
    describe('save', () => {
        it('Should write contents and finish without errors');
        it('Should throw exception containing fs error');
    });
});