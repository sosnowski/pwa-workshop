const root = require('./helpers').root;

module.exports = {
    entry: root('/src/client/worker.ts'),

    output: {
        path: root('dist/client'),
        filename: 'worker.js'
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: [
                    /node_modules/
                ],
                options: {
                    configFile: 'tsconfig.client.json'
                }
            },
            {
                test: /\.js$/,
                exclude: [
                    /\.spec.js$/,
                    /node_modules/
                ]
            }
        ]
    }
};