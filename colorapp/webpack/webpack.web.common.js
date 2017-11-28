const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const root = require('./helpers').root;

module.exports = {
    entry: {
        'app': root('/src/client/app.ts'),
        'worker': root('/src/client/worker.ts'),
        'styles': root('/src/client/app.css')
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.tsx', '.js', '.css']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [ /node_modules/],
                loader: 'ts-loader',
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
            },
            {
                test: /\.css/,
                loader: ['style-loader', 'css-loader'],
        
                include: root('src/client')
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=assets/[name].[ext]'
            }
        ],

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/client/index.html',
            chunksSortMode: 'dependency',
            inject: 'body'
        }),
        // new ExtractTextPlugin('styles.css'),
        new CopyPlugin([
            { from: 'src/client/manifest.json' }
            // { from: 'src/client/assets', to: 'client/assets' }
        ])
    ]
};