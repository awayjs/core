var typescript = require("rollup-plugin-typescript");

module.exports = {
    entry: './awayjs-core.ts',
    dest: './dist/bundle.js',
    plugins: [
        typescript()
    ]
}