const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));

const sandbox = sinon.createSandbox();

const sendInvocation = sandbox.stub();
const registerInvocation = sandbox.stub();
const wrapSchemaInvocation = sandbox.stub();
const inferIdInvocation = sandbox.stub();
const nextInvocation = sandbox.stub();

const putSchema = proxyquire('../../routes/post-schema', {
    './hal-wrapper': {wrapSchema: wrapSchemaInvocation},
    '../lib/bus-schema': {
        inferId: inferIdInvocation,
        register: registerInvocation
    }
});

const body = {};
const wrappedBody = {};
const request = {body: {body}};
const response = {send: sendInvocation};

describe('routes/post-schema', () => {
    
    afterEach(() => sandbox.reset());

    it('Should respond with the saved schema.', async () => {
        inferIdInvocation.returns('y');
        wrapSchemaInvocation.returns(wrappedBody);

        await putSchema(request, response, nextInvocation);

        expect(inferIdInvocation).to.be.calledWith(body);
        expect(registerInvocation).to.be.calledWith('y', body);
        expect(wrapSchemaInvocation).to.be.calledWith('y', body);
        expect(sendInvocation).to.be.calledWith(wrappedBody);
        expect(nextInvocation).to.be.calledOnce;
    });

    it('Should respond with HTTP 500 if an exception occurs.', async () => {
        inferIdInvocation.throwsException(Error);

        await putSchema(request, response, nextInvocation);

        expect(inferIdInvocation).to.be.calledWith(body);
        expect(registerInvocation).to.not.be.called;
        expect(wrapSchemaInvocation).to.not.be.called;
        expect(sendInvocation).to.not.be.called;
        expect(nextInvocation).to.be.calledWithMatch(error => {
            return error && error.statusCode === 500;
        });
    });
});