const chai = require('chai');
const expect = chai.expect;

const {convertIdToCamelCase} = require('../../lib/meta-schemas');

const testCases = [
    {inputString: 'some-text', expectedOutput: 'someText'},
    {inputString: 'incomplete-', expectedOutput: 'incomplete'},
    {inputString: '-malformed', expectedOutput: 'malformed'},
    {inputString: 'contains--empty', expectedOutput: 'containsEmpty'},
    {inputString: 'text', expectedOutput: 'text'},
];

describe('lib/meta-schemas', () => {
    describe('convertIdToCamelCase', () => {
        testCases.map(({inputString, expectedOutput}) => {
            it(`Should turn '${inputString}' into '${expectedOutput}'`, () => {
                expect(convertIdToCamelCase(inputString))
                    .to.be.equals(expectedOutput);
            });
        });
    });
});