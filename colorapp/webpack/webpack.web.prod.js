const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const root = require('./helpers').root;

module.exports = {
    output: {
        path: root('dist/client'),
        filename: '[name].js'
    },

    plugins: [
        new LoaderOptionsPlugin({
            debug: true,
            options: {}
        })
    ]
};