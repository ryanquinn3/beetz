var _ = require('underscore');
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var glob = require('glob');

var nodeModules = {};

fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach((mod) => nodeModules[mod] = 'commonjs ' + mod);

var frontendConfig = {
    entry: [
        path.join(__dirname, 'src','public', 'app', 'index.ts')
    ],
    output: {
        path: path.join(__dirname, 'src', 'public', 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".ts"],
        alias: {
            types: pathToSrc('public/app/core/types'),
            jQuery: 'jquery/dist/jquery.js'
        },
        moduleDirectories: [
            path.join(__dirname, 'node_modules'),
            path.join(__dirname, 'src'),
        ],
    },
    externals: {
   //     'jquery': '$'
    },
};

var backendConfig = {
    node: {
        __filename: true,
        __dirname: true
    },
    target: 'node',
    entry: './src/boot.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'app.js'
    },
    resolve: {
        moduleDirectories: [
            path.join(__dirname, 'node_modules'),
            path.join(__dirname, 'src'),
        ],
        alias: {
            models: pathToSrc('models'),
            db: pathToSrc('db'),
            middleware: pathToSrc('middleware')
        }
    },
    externals: nodeModules,
    plugins: [
      new webpack.BannerPlugin('require("source-map-support").install();',
                               { raw: true, entryOnly: false })
    ]
};

var testConfig = {
    entry: glob.sync('**/*-spec.js'),
    debug: true,
    devtool: 'inline-source-map',
    node: {
        fs: 'empty'
    },
    resolve: {
        root: [
            path.resolve(__dirname)
        ]
    }
};


function pathToSrc(folder){
    return path.join(__dirname, 'src', folder);
}

function create(options) {
    var defaultConfig = {
        devtool: 'source-map',
        module: {
            loaders: [
                { test: /\.ts/,
                    loader:'ts-loader',
                    exclude: path.join(__dirname, 'node_modules')
                },
                {
                    test: /\.js$|\.tag$/,
                    loader: 'babel',
                    exclude: path.join(__dirname, 'node_modules'),
                    query: {
                        presets: ['es2015']
                    }
                },
                { test: /\.css$/, loader: 'style!css'},
                { test: /\.scss$/, loader: 'raw!sass?sourceMap'},
                { test: /\.html$/, loader: 'raw' },
                { test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: 'file-loader' }

            ],
            preLoaders: [
                {
                    test: /\.tag$/,
                    exclude: path.join(__dirname, 'node_modules'),
                    loader: 'riotjs-loader',
                    query: {type: 'none'}
                }
            ]
        }
    };
    return _(defaultConfig).extend(options);
}

module.exports = {
    backend: create(backendConfig),
    frontend: create(frontendConfig),
    testing: create(testConfig)
};
