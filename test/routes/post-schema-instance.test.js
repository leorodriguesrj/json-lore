const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));

const sandbox = sinon.createSandbox();

const sendInvocation = sandbox.stub();
const wrapValidationOutcomeInvocation = sandbox.stub();
const validateInvocation = sandbox.stub();
const nextInvocation = sandbox.stub();

const postSchemaInstance = proxyquire('../../routes/post-schema-instance', {
    './hal-wrapper': {wrapValidationOutcome: wrapValidationOutcomeInvocation},
    '../lib/bus-schema': {
        validate: validateInvocation
    }
});

const resource = {};
const wrappedBody = {};
const request = {body: {resource}, params: {id: 'xpto'}};
const response = {send: sendInvocation};

describe('routes/post-schema-instance', () => {
    afterEach(() => sandbox.reset());
    
    it('Should respond with the result of validation.', async () => {
        validateInvocation.returns('ok');
        wrapValidationOutcomeInvocation.returns(wrappedBody);

        await postSchemaInstance(request, response, nextInvocation);

        expect(validateInvocation).to.be.calledWith('xpto', resource);
        expect(wrapValidationOutcomeInvocation).to.be.calledWith('xpto', 'ok');
        expect(sendInvocation).to.be.calledWith(wrappedBody);
        expect(nextInvocation).to.be.calledOnce;
    });

    it('Should respond with HTTP 500 in case of exception.', async () => {
        validateInvocation.throwsException(Error);

        await postSchemaInstance(request, response, nextInvocation);

        expect(validateInvocation).to.be.calledWith('xpto', resource);
        expect(wrapValidationOutcomeInvocation).to.not.be.called;
        expect(sendInvocation).to.not.be.called;
        expect(nextInvocation).to.be.calledWithMatch(error => {
            return error && error.statusCode === 500;
        });
    });
});