const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));

const sandbox = sinon.createSandbox();

const existsInvocation = sandbox.stub();
const nextInvocation = sandbox.stub();

const {NotFoundError, InternalError} = require('restify-errors');
const confirmSchemaExistsById = proxyquire(
    '../../routes/confirm-schema-exists-by-id',
    {'../lib/data-schema': {exists: existsInvocation}}
);

const request = {params: {id: 'xpto'}};
const response = {};

describe('routes/confirm-schema-exists-by-id', () => {
    afterEach(() => sandbox.reset());

    it('Should continue to next step if schema is found.', async () => {
        existsInvocation.returns(true);

        await confirmSchemaExistsById(request, response, nextInvocation);

        expect(existsInvocation)
            .to.be.calledOnce
            .and.to.be.calledWith('xpto');
            
        expect(nextInvocation)
            .to.be.calledOnce;
    });
    it('Should fail with HTTP 404 if schema is NOT found.', async () => {
        existsInvocation.returns(false);

        await confirmSchemaExistsById(request, response, nextInvocation);

        expect(existsInvocation)
            .to.be.calledOnce
            .and.to.be.calledWith('xpto');
            
        expect(nextInvocation)
            .to.be.calledOnce
            .and.to.be.calledWithMatch(error =>
                error instanceof NotFoundError);
    });
    it('Should fail with HTTP 500 if an exception occurs.', async () => {
        existsInvocation.throws(Error);

        await confirmSchemaExistsById(request, response, nextInvocation);

        expect(existsInvocation)
            .to.be.calledOnce
            .and.to.be.calledWith('xpto');

        expect(nextInvocation)
            .to.be.calledOnce
            .and.to.be.calledWithMatch(error =>
                error instanceof InternalError);
    });
});