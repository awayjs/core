var path = require("path");
var DtsBunderPlugin = require("dtsbundler-webpack-plugin");

module.exports = {
    entry: ['./index.ts'],
    output: {
        filename: './dist/awayjs-core.js',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        library: "awayjs-core"
    },
    externals: [
        // Every non-relative module is external
        // abc -> require("abc")
        /^[a-z\-0-9]+$/
    ],
    //turn on sourcemaps
    devtool: 'source-map',
    resolve: {
        alias: {
            'awayjs-core': __dirname
        },
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
        fallback: [path.join(__dirname, 'node_modules')]
    },
    resolveLoader: {
        fallback: [path.join(__dirname, 'node_modules')]
    },
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.ts(x?)$/, loader: 'babel!ts-loader' }
        ]
    }
}