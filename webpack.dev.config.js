var webpack = require('webpack');
var path = require('path');

var fs = require('fs');
var CHUNK_REGEX = /^([A-Za-z0-9_\-]+)\..*/;
var _ = require('lodash');
var env = {
    hot_server_host:'127.0.0.1',
    hot_server_port:5578
};
var config = {
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    entry: [
        'webpack-dev-server/client?http://' + env.hot_server_host + ':' + env.hot_server_port,
        'webpack/hot/dev-server',
        './src/client.js'
    ],
    output: {
        path: path.join(__dirname, '/src/public/build/js'),
        filename: '[name].js',
        publicPath: 'http://' + env.hot_server_host + ':' + env.hot_server_port + '/build/js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loaders: ['react-hot', 'babel-loader']
            },{
                test: /\.json$/,
                exclude: /node_modules/,
                loaders:['json-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),

        // See:
        // https://github.com/yahoo/fluxible/issues/138
        new webpack.IgnorePlugin(/vertx/),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),

        new webpack.optimize.CommonsChunkPlugin('common.js', undefined, 2),
        // new webpack.NormalModuleReplacementPlugin(/^react(\/addons)?$/, require.resolve('react/addons'))

        function webpackStatsPlugin() {
            this.plugin('done', function (stats) {
                var data = stats.toJson();
                var assets = data.assetsByChunkName;
                console.log(assets)
                var output = {
                    assets: {},
                    cdnPath: this.options.output.publicPath
                };
                Object.keys(assets).forEach(function eachAsset(key) {
                    var value = assets[key];
                    var matches = key.match(CHUNK_REGEX);
                    if (matches) {
                        key = matches[1];
                    }
                    output.assets[key] = 'http://' + env.hot_server_host + ':' + env.hot_server_port + '/build/js/' + (_.isArray(value) ? value[0] : value);
                });

                fs.writeFileSync(
                    path.join(__dirname, '/src/public/build', 'assets.json'),
                    JSON.stringify(output, null, 4)
                );
            });
        }
    ],
    stats: {
        colors: true
    },
    devtool: "eval"
};

module.exports = config;