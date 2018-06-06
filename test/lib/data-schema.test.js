
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));

const sandbox = sinon.createSandbox();

const readdirSub = sandbox.stub();
const readFileStub = sandbox.stub();

const dataSchema = proxyquire('../../lib/data-schema', {
    'fs': {
        'readdir': (path, callback) => {
            const {error, data} = readdirSub(path);
            callback(error, data);
        },
        'readFile': (path, callback) => {
            const {error, data} = readFileStub(path);
            callback(error, data);
        }
    }
});

describe('lib/data-schema', () => {
    describe('findAll', () => {
        afterEach(() => sandbox.reset());

        it('Should load the two files listed by fs', async () => {
            readdirSub.returns({
                error: undefined, data: ['schema1.json', 'schema2.json']
            });

            readFileStub.onCall(0).returns({
                error: undefined, data: '{"someName": "someValue"}'
            });

            readFileStub.onCall(1).returns({
                error: undefined, data: '{"anotherName": "anotherValue"}'
            });

            const schemas = await dataSchema.findAll();

            expect(readdirSub).to.be.calledOnce;
            expect(readFileStub).to.be.calledTwice;
            expect(schemas).to.be.deep.equals([
                { someName: 'someValue' },
                { anotherName: 'anotherValue' }
            ]);
        });
        it('Should reject/throw if cache listing fails');
        it('Should reject/throw if at list one file fails to load');
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