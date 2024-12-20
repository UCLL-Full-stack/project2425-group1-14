const path = require('path');

module.exports = {
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'nl'],
        defaultLocale: 'en',
    },
    webpack(config) {
        config.resolve.alias['@'] = path.resolve('src');
        return config;
    },
};