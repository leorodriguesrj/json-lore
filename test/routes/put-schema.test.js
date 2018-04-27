const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));

const sandbox = sinon.createSandbox();

const sendInvocation = sandbox.stub();
const registerInvocation = sandbox.stub();
const wrapSchemaInvocation = sandbox.stub();
const nextInvocation = sandbox.stub();

const putSchema = proxyquire('../../routes/put-schema', {
    './hal-wrapper': {wrapSchema: wrapSchemaInvocation},
    '../lib/bus-schema': {register: registerInvocation}
});

const resource = {};
const wrappedBody = {};
const request = {params: {id: 'x'}, body: {resource}};
const response = {send: sendInvocation};

describe('routes/put-schema', () => {
    
    afterEach(() => sandbox.reset());

    it('Should respond with the saved schema.', async () => {
        wrapSchemaInvocation.returns(wrappedBody);

        await putSchema(request, response, nextInvocation);

        expect(registerInvocation).to.be.calledWith('x', resource);
        expect(wrapSchemaInvocation).to.be.calledWith('x', resource);
        expect(sendInvocation).to.be.calledWith(wrappedBody);
        expect(nextInvocation).to.be.calledOnce;
    });

    it('Should respond with HTTP 500 if an exception occurs.', async () => {
        registerInvocation.throwsException(Error);

        await putSchema(request, response, nextInvocation);

        expect(registerInvocation).to.be.calledWith('x', resource);
        expect(wrapSchemaInvocation).to.not.be.called;
        expect(sendInvocation).to.not.be.called;
        expect(nextInvocation).to.be.calledWithMatch(error => {
            return error && error.statusCode === 500;
        });
    });
});