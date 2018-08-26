const path = require('path');
const webpack = require('webpack');

const node_path = path.join(__dirname, 'node_modules');
const ManifestPlugin = require('webpack-manifest-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const languages = ['en', 'es', 'fr', 'pt'];
const public_path = '/static/';

module.exports = function(env, argv) {
    const isProd = argv.mode === 'production';
    const config = {
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
            filename: isProd ? '[name].[hash].js' : '[name].js',
            chunkFilename: isProd ? 'chunks/[id].[chunkhash].js' : 'chunks/[id].js'
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
                {test: /\.css$/, loader: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {sourceMap: true}},
                ]},
                {test: /\.less$/, loader: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {sourceMap: true}},
                    {loader: 'less-loader', options: {sourceMap: true}},
                ]},
                {test: /\.vue$/, loader: 'vue-loader'},
                {test: /\.(woff|svg|ttf|eot|otf)([\?]?.*)$/, exclude: /img/, loader: 'file-loader?name=[name].[ext]'},
                {test: /\.js$/, loader: 'babel-loader', include: [
                        path.resolve(__dirname, 'js'),
                        path.resolve(__dirname, 'node_modules/vue-strap/src'),
                    ]
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
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
            new MiniCssExtractPlugin({
                filename: isProd ? '[name].[hash].css' : '[name].css',
                chunkFilename: isProd ? 'chunks/[id].[hash].css' : 'chunks/[id].css',
            }),
            new webpack.DefinePlugin({
                DEBUG: isProd
            }),
            // Only include needed translations
            new webpack.ContextReplacementPlugin(/moment\/locale$/, new RegExp('^' + languages.join('|') + '$')),
            new webpack.ContextReplacementPlugin(/locales$/, new RegExp(languages.join('|'))),
        ],
        stats: {
            children: false  // Hide verbose children stats from output
        },
        node: {
            fs: 'empty',
            net: 'empty',
            tls: 'empty'
        }
    };
    if (isProd) {
        config.devtool = 'source-map';
        config.optimization = {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCSSAssetsPlugin({}),
            ],
        };
        // module.exports.plugins.push(
        //     // new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: true})
        //     new webpack.optimize.UglifyJsPlugin({
        //         minimize: true,
        //         sourceMap: true,
        //         output: {
        //             comments: false,
        //             screw_ie8: true
        //         },
        //         mangle: {
        //             screw_ie8: true,
        //             keep_fnames: true
        //         },
        //         compress: {
        //             warnings: false,
        //             screw_ie8: true
        //         }
        //     }),
        //     new webpack.optimize.DedupePlugin()
        // );
    } else {
        // config.devtool = 'eval-source-map';
        // module.exports.devtool = '#source-map';
        // module.exports.plugins.push(
        //     // new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: true})
        //     new webpack.LoaderOptionsPlugin({
        //         debug: true
        //     })
        // );
    }

    return config;
}

