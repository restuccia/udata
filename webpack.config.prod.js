const webpack = require('webpack');
const config = require('./webpack.config');

config.plugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        output: {
            comments: false,
            screw_ie8: true
        },
        mangle: {
            screw_ie8: true,
            keep_fnames: true
        },
        compress: {
            warnings: false,
            screw_ie8: true
        }
    }),
    new webpack.optimize.DedupePlugin(),
);

config.devtool = 'source-map';

/**
 * Image optimization.
 * Not working yet
 */
// config.module.loaders.push({
//     test: /^images\/.*\.(jpe?g|png|gif|svg)$/i,
//     loaders: ['image?bypassOnDebug&optimizationLevel=7&interlaced=false']
// });

module.exports = config;
