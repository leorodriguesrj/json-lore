const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));

const sandbox = sinon.createSandbox();
const validateInvocation = sandbox.stub();
const nextInvocation = sandbox.stub();

const {BadRequestError, InternalError} = require('restify-errors');
const confirmPayloadIntegrity = proxyquire('../../routes/confirm-payload-integrity', {
    '../lib/meta-schemas': {
        validator: {validate: (b, s) => validateInvocation(b, s)}
    }
});

const body = {};
const request = {body};
const response = {};
const payloadSchema = {};

describe('routes/confirm-payload-integrity', () => {
    const confirmIntegriy = confirmPayloadIntegrity(payloadSchema);

    afterEach(() => sandbox.reset());

    it('Should continue to next step if validation succeeds', () => {
        validateInvocation.returns({valid: true});
        const subject = confirmIntegriy(request, response, nextInvocation);
        expect(nextInvocation).to.be.calledOnce;
    });
    it('Should fail with HTTP 400 if validation fails', () => {
        validateInvocation.returns({valid: false});
        const subject = confirmIntegriy(request, response, nextInvocation);
        expect(nextInvocation)
            .to.be.calledOnce
            .and.to.be.calledWithMatch(error =>
                error instanceof BadRequestError);
    });
    it('Should fail with HTTP 500 if exception occurs', () => {
        validateInvocation.throwsException(Error);
        const subject = confirmIntegriy(request, response, nextInvocation);
        expect(nextInvocation)
            .to.be.calledOnce
            .and.to.be.calledWithMatch(error =>
                error instanceof InternalError);
    });
});