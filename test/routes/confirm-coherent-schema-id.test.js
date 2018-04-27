const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));

const sandbox = sinon.createSandbox();
const inferIdInvocation = sandbox.stub();
const nextInvocation = sandbox.stub();

const {InternalError, ConflictError} = require('restify-errors');
const confirmCoherentSchemaId = proxyquire(
    '../../routes/confirm-coherent-schema-id',
    {'../lib/bus-schema': {inferId: inferIdInvocation}}
);

const innerBody = {};
const request = {body: {body: innerBody}};
const response = {};

describe('routes/confirm-coherent-schema-id', () => {
    afterEach(() => sandbox.reset());

    it('Should continue if body has no "id"', async () => {
        inferIdInvocation.returns('');
        await confirmCoherentSchemaId(request, response, nextInvocation);
        expect(inferIdInvocation)
            .to.be.calledOnce
            .and.to.be.calledWith(innerBody);
        expect(nextInvocation)
            .to.be.calledOnce;
    });
    it('Should continue if body and URI have the same "id"', async () => {
        inferIdInvocation.returns('z');
        const innerBody = {};
        const localRequest = {body: {body: innerBody}, params: {id: 'z'}};
        await confirmCoherentSchemaId(localRequest, response, nextInvocation);
        expect(inferIdInvocation)
            .to.be.calledOnce
            .and.to.be.calledWith(innerBody);
        expect(nextInvocation)
            .to.be.calledOnce;
    });
    it('Should fail with HTTP 409 if body and URL ids differ', async () => {
        inferIdInvocation.returns('x');
        const innerBody = {};
        const localRequest = {body: {body: innerBody}, params: {id: 'y'}};
        await confirmCoherentSchemaId(localRequest, response, nextInvocation);
        expect(inferIdInvocation)
            .to.be.calledOnce
            .and.to.be.calledWith(innerBody);
        expect(nextInvocation)
            .to.be.calledOnce
            .and.to.be.calledWithMatch(error =>
                error instanceof ConflictError);
    });
    it('Should fail with HTTP 500 if an exception occurs', async () => {
        inferIdInvocation.throwsException(Error);
        await confirmCoherentSchemaId(request, response, nextInvocation);
        expect(nextInvocation)
            .to.be.calledOnce
            .and.to.be.calledWithMatch(error =>
                error instanceof InternalError);
    });
});