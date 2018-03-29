const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

chai.use(require('sinon-chai'));

const sandbox = sinon.createSandbox();

const wrapSchemaInvocation = sandbox.stub();
const pickByIdInvocation = sandbox.stub();
const sendInvocation = sandbox.stub();
const nextInvocation = sandbox.stub();

const getSchemaById = proxyquire('../../routes/get-schema-by-id', {
    './hal-wrapper': {
        wrapSchema: wrapSchemaInvocation
    },
    '../lib/data-schema': {
        pickById: pickByIdInvocation
    }
});

const schema = 'the-schema';
const wrappedSchema = '[the-schema]';
const request = {params: {id: 'xpto'}};
const response = {send: sendInvocation};

describe('routes/get-schema-id', () => {
    afterEach(() => sandbox.reset());

    it('Should respond with the schema found.', async () => {
        pickByIdInvocation.returns(schema);
        wrapSchemaInvocation.returns(wrappedSchema);

        await getSchemaById(request, response, nextInvocation);

        expect(nextInvocation).to.be.calledOnce;
        expect(sendInvocation)
            .to.be.calledOnce
            .and.to.be.calledWith(wrappedSchema);
        expect(pickByIdInvocation)
            .to.be.calledOnce
            .and.to.be.calledWith('xpto');
        expect(wrapSchemaInvocation)
            .to.be.calledOnce
            .and.to.be.calledWith('xpto', schema);
    });
    it('Should respond with HTTP 500 if an exception occurs."', async () => {
        pickByIdInvocation.throwsException(Error);

        await getSchemaById(request, response, nextInvocation);
        
        expect(pickByIdInvocation)
            .to.be.calledOnce
            .and.to.be.calledWith('xpto');
        
        expect(sendInvocation).to.not.be.called;
        expect(wrapSchemaInvocation).to.not.be.called;

        expect(nextInvocation).to.be.calledWithMatch(error => {
            return error && error.statusCode === 500;
        });
    });
});