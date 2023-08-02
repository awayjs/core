import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
	input: './dist/index.js',
	output: {
		name: 'AwayjsCore',
		sourcemap: true,
		format: 'umd',
		file: './bundle/awayjs-core.umd.js'
	},
	plugins: [
		nodeResolve(),
		commonjs(),
		terser(),
	]
};