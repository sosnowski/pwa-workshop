const merge = require('webpack-merge');

const web = {
    commons: require('./webpack/webpack.web.common.js'),
    dev: require('./webpack/webpack.web.dev.js'),
    prod: require('./webpack/webpack.web.prod.js')
};

module.exports = [
    merge(web.commons, process.env.NODE_ENV === 'prod' ? web.prod : web.dev)
];