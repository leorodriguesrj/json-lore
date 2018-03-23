const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const sandbox = sinon.createSandbox();

const inferIdInvocation = sandbox.stub();
const momentInvocation = sandbox.stub();

const halWrapper = proxyquire('../../routes/hal-wrapper', {
    '../lib/bus-schema': {inferId: inferIdInvocation},
    'moment': momentInvocation
});

describe('routes/hal-wrapper', () => {
    describe('wrapSchema', () => {
        beforeEach(() => sandbox.reset());
        it('Should return a resource with property "body".');
        it('Should return a resource with the timestamp of operation.');
        it('Should return a resource with the "self" link.');
        it('Should return a resource with the "all" link.');
    });
    describe('wrapSchemaCollection', () => {
        beforeEach(() => sandbox.reset());        
        it('Should return a resource with the collection embedded.');
        it('Should return a resource with the total number of items.');
        it('Should return a resource with the timestamp of operation.');
        it('Should return a resource with the "self" link.');
        it('Should return a resource with the "pick" link.');
        it('Should return a resource with the "update" link.');
        it('Should return a resource with the "new" link.');
        it('Should return a resource with the "validate" link.');
    });
    describe('wrapValidationOutcome', () => {
        beforeEach(() => sandbox.reset());
        it('Should return a resource with a "body".', () => {
            const subject = halWrapper.wrapValidationOutcome('y', {a: 112358});
            expect(subject).haveOwnProperty('body');
            expect(subject.body).to.be.deep.equal({a: 112358});
        });
        it('Should return a resource with the timestamp of operation.', () => {
            momentInvocation.returns('now');
            const subject = halWrapper.wrapValidationOutcome('x', {a: 1});
            expect(subject).haveOwnProperty('at');
            expect(subject.at).to.be.equal('now');
        });
        it('Should return a resource with the "self" link.', () => {
            const subject = halWrapper.wrapValidationOutcome('x', {a: 1});
            expect(subject._links).haveOwnProperty('self');
            expect(subject._links.self.rel).to.be.equal('self');
            expect(subject._links.self.href).to.be.equal('/schema/x/instance');
        });
        it('Should return a resource with the "schema" link.', () => {
            const subject = halWrapper.wrapValidationOutcome('x', {a: 1});
            expect(subject._links).haveOwnProperty('schema');
            expect(subject._links.schema.rel).to.be.equal('schema');
            expect(subject._links.schema.href).to.be.equal('/schema/x');
        });
    });
});