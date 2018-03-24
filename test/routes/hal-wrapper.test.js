const proxyquire = require('proxyquire');
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

const sandbox = sinon.createSandbox();

const inferIdInvocation = sandbox.stub();
const momentInvocation = sandbox.stub();
const wrapSchemaInvocation = sandbox.stub();

const halWrapper = proxyquire('../../routes/hal-wrapper', {
    '../lib/bus-schema': {inferId: inferIdInvocation},
    'moment': momentInvocation
});

describe('routes/hal-wrapper', () => {
    afterEach(() => sandbox.reset());

    describe('wrapSchema', () => {
        it('Should return a resource with property "body".');
        it('Should return a resource with the timestamp of operation.');
        it('Should return a resource with the "self" link.');
        it('Should return a resource with the "all" link.');
    });

    describe('wrapSchemaCollection', () => {
        const altWrapper = proxyquire('../../routes/hal-wrapper', {
            '../lib/bus-schema': {inferId: inferIdInvocation},
            'moment': momentInvocation
        });
        altWrapper.wrapSchema = wrapSchemaInvocation;

        wrapSchemaInvocation.returns('the-resource');
        momentInvocation.returns('yesterday');
        const subject = altWrapper.wrapSchemaCollection(['y'], {a: 112358});

        it('Should return a resource with the collection embedded.', () => {
            expect(subject).haveOwnProperty('_embedded');
            expect(subject._embedded).to.haveOwnProperty('items');
            expect(subject._embedded.items).to.be.deep.equal(['the-resource']);
        });
        it('Should return a resource with the total number of items.', () => {
            expect(subject).haveOwnProperty('total');
            expect(subject.total).to.be.equal(1);
        });
        it('Should return a resource with the timestamp of operation.', () => {
            expect(subject).haveOwnProperty('at');
            expect(subject.at).to.be.equal('yesterday');
        });
        it('Should return a resource with the "self" link.', () => {
            const links = subject._links;
            expect(links).haveOwnProperty('self');
            expect(links.self.href).to.be.equal('/schema/');
            expect(links.self.templated).to.be.undefined;
            expect(links.self.rel).to.be.equal('self');
        });
        it('Should return a resource with the "pick" link.', () => {
            const links = subject._links;
            expect(links).haveOwnProperty('pick');
            expect(links.pick.href).to.be.equal('/schema/{id}');
            expect(links.pick.templated).to.be.true;
            expect(links.pick.rel).to.be.equal('pick');
        });
        it('Should return a resource with the "update" link.', () => {
            const links = subject._links;
            expect(links).haveOwnProperty('update');
            expect(links.update.href).to.be.equal('/schema/{id}');
            expect(links.update.templated).to.be.true;
            expect(links.update.rel).to.be.equal('update');
        });
        it('Should return a resource with the "new" link.', () => {
            const links = subject._links;
            expect(links).haveOwnProperty('new');
            expect(links.new.href).to.be.equal('/schema/{id}');
            expect(links.new.templated).to.be.true;
            expect(links.new.rel).to.be.equal('new');
        });
        it('Should return a resource with the "validate" link.', () => {
            const links = subject._links;
            expect(links).haveOwnProperty('validate');
            expect(links.validate.href).to.be.equal('/schema/{id}/instance');
            expect(links.validate.templated).to.be.true;
            expect(links.validate.rel).to.be.equal('validate');
        });
    });

    describe('wrapValidationOutcome', () => {
        momentInvocation.returns('now');
        const subject = halWrapper.wrapValidationOutcome('x', {a: 112358});

        it('Should return a resource with a "body".', () => {
            expect(subject).haveOwnProperty('body');
            expect(subject.body).to.be.deep.equal({a: 112358});
        });
        it('Should return a resource with the timestamp of operation.', () => {
            expect(subject).haveOwnProperty('at');
            expect(subject.at).to.be.equal('now');
        });
        it('Should return a resource with the "self" link.', () => {
            expect(subject._links).haveOwnProperty('self');
            expect(subject._links.self.rel).to.be.equal('self');
            expect(subject._links.self.href).to.be.equal('/schema/x/instance');
        });
        it('Should return a resource with the "schema" link.', () => {
            expect(subject._links).haveOwnProperty('schema');
            expect(subject._links.schema.rel).to.be.equal('schema');
            expect(subject._links.schema.href).to.be.equal('/schema/x');
        });
    });
});