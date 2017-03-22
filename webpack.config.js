const path = require('path');
const webpack = require('webpack');

const node_path = path.join(__dirname, 'node_modules');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const css_loader = ExtractTextPlugin.extract({
    use: [
        {loader: 'css-loader', options: {sourceMap: true}},
    ],
    fallback: 'style-loader',
});
const less_loader = ExtractTextPlugin.extract({
    use: [
        {loader: 'css-loader', options: {sourceMap: true}},
        {loader: 'less-loader', options: {sourceMap: true}},
    ],
    fallback: 'style-loader',
});
const babel_loader = {
    loader: 'babel-loader',
    options: {
        presets: [
            ['es2015', { 'modules': false }],
        ],
        comments: false,
        plugins: ['transform-runtime']
    }
};

const languages = ['en', 'es', 'fr', 'pt'];
const public_path = '/static/';

module.exports = {
    entry: {
        admin: './js/admin.js',
        dataset: './js/front/dataset',
        territory: './js/front/territory',
        reuse: './js/front/reuse',
        site: './js/front/site.js',
        home: './js/front/home.js',
        search: './js/front/search.js',
        dashboard: './js/front/dashboard.js',
        apidoc: './js/front/apidoc',
        organization: './js/front/organization',
        covermap: './js/front/covermap',
        topic: './js/front/topic',
        post: './js/front/post',
        user: './js/front/user',
    },
    output: {
        path: path.join(__dirname, 'udata', 'static'),
        publicPath: public_path,
        filename: '[name].[hash].js',
        chunkFilename: 'chunks/[id].[chunkhash].js'
    },
    resolve: {
        modules: [
            __dirname,
            path.resolve('js'),
            path.resolve('node_modules'),
        ],
        alias: {
            'jquery-slimscroll': path.join(node_path, 'jquery-slimscroll/jquery.slimscroll'),
            'swaggerui': 'swagger-ui/dist',
            // Allow template compiler
            vue$: 'vue/dist/vue.common.js',
        }
    },
    module: {
        rules: [
            {test: /\.(jpg|jpeg|png|gif|svg)$/, loader: 'file-loader'},
            {test: /\.css$/, loader: css_loader},
            {test: /\.less$/, loader: less_loader},
            {test: /\.vue$/, loader: 'vue-loader', options: {
                loaders: {
                    css: css_loader,
                    less: less_loader,
                    js: babel_loader
                }
            }},
            {test: /\.(woff|svg|ttf|eot|otf)([\?]?.*)$/, exclude: /img/, loader: 'file-loader?name=[name].[ext]'},
            {test: /\.js$/, loader: babel_loader, include: [
                    path.resolve(__dirname, 'js'),
                    path.resolve(__dirname, 'node_modules/vue-strap/src'),
                ]
            }
        ]
    },
    plugins: [
        // Fix AdminLTE packaging
        new webpack.NormalModuleReplacementPlugin(
            /admin-lte\/build\/img\/boxed-bg\.jpg$/,
            'admin-lte/dist/img/boxed-bg.jpg'
        ),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',  // Required by bootstrap.js
            'window.jQuery': 'jquery',  // Required by swagger.js jquery client
        }),
        new ManifestPlugin({
            fileName: path.join(__dirname, 'udata', 'manifest.json'),
            // Filter out chunks and source maps
            filter: ({name, isInitial, isChunk}) => !name.endsWith('.map') && (isInitial || !isChunk),
            publicPath: public_path,
        }),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new webpack.DefinePlugin({
            DEBUG: process.env.NODE_ENV !== 'production'
        }),
        // Only include needed translations
        new webpack.ContextReplacementPlugin(/moment\/locale$/, new RegExp('^' + languages.join('|') + '$')),
        new webpack.ContextReplacementPlugin(/locales$/, new RegExp(languages.join('|'))),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: 10,  // (Modules must be shared between 10 entries)
        })
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    }
};

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = 'source-map';
    module.exports.plugins.push(
        // new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: true})
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: true,
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
        new webpack.optimize.DedupePlugin()
    );
} else {
    module.exports.devtool = 'eval-source-map';
    // module.exports.devtool = '#source-map';
    module.exports.plugins.push(
        // new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: true})
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    );
}
