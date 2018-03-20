const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const root = require('./helpers').root;

module.exports = {
    devtool: 'source-map',

    output: {
        path: root('/src/dist'),
        filename: '[name].js'
    },

    plugins: [
        new LoaderOptionsPlugin({
            debug: true,
            options: {}
        })
    ],

    watch: true,
    watchOptions: {
        ignored: 'src/**/*.*'
    }
};