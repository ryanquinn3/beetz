var _ = require('underscore');
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var nodeModules = {};

fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => nodeModules[mod] = 'commonjs ' + mod);

function pathTo() {
    return path.join(__dirname, path.join.apply(path, arguments));
}

function pathToSrc(){
    return pathTo('src');
}

module.exports = (options) => {
    var config = {
        entry: './src/boot.js',
        target: 'node',
        output: {
            path: path.join(__dirname, 'build'),
            filename: 'app.js'
        },
        node: {
            __filename: true,
            __dirname: true
        },
        resolve:{
            extensions: [ '', '.js'],
            alias: {
                middleware: pathToSrc('middleware')
            }
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: path.join( __dirname, 'node_modules' ),
                    query: {
                        presets: ['es2015']
                    }
                }
            ]
        },
        externals: nodeModules,
        plugins: [
          new webpack.BannerPlugin('require("source-map-support").install();',
                                   { raw: true, entryOnly: false })
        ]
    };

    return _(config).extend(options);
};