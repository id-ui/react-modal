const config = require('kcd-scripts/jest');

module.exports = {
    ...config,
    coverageThreshold: {
        "global": {
            "branches": 95,
            "functions": 95,
            "lines": 95,
            "statements": 95
        },
        "./src/hooks/useOpen": {
            branch: 50,
        }
    }
};
