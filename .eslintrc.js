module.exports = {
    'extends': 'eslint:recommended',
    'rules': {
        'indent': ['error', 4, {
            'SwitchCase': 1
        }],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'max-len': ["error", 80],
        "complexity": ["error", 4],
        "camelcase": ["error", {
            "properties": "always"
        }],
        "new-cap": ["error", {
            "capIsNew": true,
            "newIsCap": true,
            "capIsNewExceptions": ["Resource"]
        }],
        "newline-per-chained-call": ["error", {
            "ignoreChainWithDepth": 2
        }],
        "prefer-const": ["error", {
            "destructuring": "any",
            "ignoreReadBeforeAssign": false
        }]
    },
    "parserOptions": {
        "ecmaVersion": 2017
    },
    'env': {
        'node': true,
        'es6': true
    }
}