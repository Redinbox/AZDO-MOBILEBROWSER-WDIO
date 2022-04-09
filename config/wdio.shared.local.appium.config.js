const {config} = require('./wdio.shared.config');

config.services = config.services.concat([
    [
        'appium',
        {
            command: 'appium',
        },

    ],
]);
exports.config = config;
