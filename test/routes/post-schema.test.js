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

const postSchema = proxyquire('../../routes/post-schema', {
    './hal-wrapper': {wrapSchema: wrapSchemaInvocation},
    '../lib/bus-schema': {
        inferId: inferIdInvocation,
        register: registerInvocation
    }
});

const resource = {};
const wrappedBody = {};
const request = {body: {resource}};
const response = {send: sendInvocation};

describe('routes/post-schema', () => {
    
    afterEach(() => sandbox.reset());

    it('Should respond with the saved schema.', async () => {
        inferIdInvocation.returns('y');
        wrapSchemaInvocation.returns(wrappedBody);

        await postSchema(request, response, nextInvocation);

        expect(inferIdInvocation).to.be.calledWith(resource);
        expect(registerInvocation).to.be.calledWith('y', resource);
        expect(wrapSchemaInvocation).to.be.calledWith('y', resource);
        expect(sendInvocation).to.be.calledWith(wrappedBody);
        expect(nextInvocation).to.be.calledOnce;
    });

    it('Should respond with HTTP 500 if an exception occurs.', async () => {
        inferIdInvocation.throwsException(Error);

        await postSchema(request, response, nextInvocation);

        expect(inferIdInvocation).to.be.calledWith(resource);
        expect(registerInvocation).to.not.be.called;
        expect(wrapSchemaInvocation).to.not.be.called;
        expect(sendInvocation).to.not.be.called;
        expect(nextInvocation).to.be.calledWithMatch(error => {
            return error && error.statusCode === 500;
        });
    });
});