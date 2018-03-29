const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));

const sandbox = sinon.createSandbox();

const wrapSchemaCollectionInvocation = sandbox.stub();
const findAllInvocation = sandbox.stub();
const sendInvocation = sandbox.stub();
const nextInvocation = sandbox.stub();

const getAllSchemas = proxyquire('../../routes/get-all-schemas', {
    './hal-wrapper': {
        wrapSchemaCollection: wrapSchemaCollectionInvocation
    },
    '../lib/data-schema': {
        findAll: findAllInvocation
    }
});

const request = {};
const response = {send: sendInvocation};

describe('routes/get-all-schemas', () => {
    afterEach(() => sandbox.reset());

    it('Should respond with the list of schemas found.', async () => {
        const schemas = ['a', 'b', 'c'];
        const wrapSchemaCollection = {};

        findAllInvocation.returns(schemas);
        wrapSchemaCollectionInvocation.returns(wrapSchemaCollection);

        await getAllSchemas(request, response, nextInvocation);

        expect(findAllInvocation).to.be.calledOnce;
        expect(nextInvocation).to.be.calledOnce;
        expect(sendInvocation)
            .to.be.calledOnce
            .and.to.be.calledWith(wrapSchemaCollection);
        expect(wrapSchemaCollectionInvocation)
            .to.be.calledOnce
            .and.to.be.calledWith(schemas);
    });
    it('Should respond with HTTP 500 in case of exception.', async () => {
        findAllInvocation.throwsException(Error);

        await getAllSchemas(request, response, nextInvocation);
        
        expect(findAllInvocation).to.be.calledOnce;
        expect(wrapSchemaCollectionInvocation).to.not.be.called;
        expect(sendInvocation).to.not.be.called;

        expect(nextInvocation).to.be.calledWithMatch(error => {
            return error && error.statusCode === 500;
        });
    });
});