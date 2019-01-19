const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = function(env, argv) {
	const base = {
		target: 'node',
		externals: [nodeExternals()],
		entry: './src/server/index.ts',
		output: {
			filename: 'server.js',
			path: path.resolve(process.cwd(), 'dist'),
			publicPath: '/'
		},
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".json"],
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: [
						{
							loader: 'ts-loader',
						}
					]
				},
			]
		},	
	}
	if (env.platform === 'server') {
		base.target = 'node'
	}
	if (env.platform == 'web') {
		base.entry = './src/client.tsx'
		base.output.filename = 'client.js'
	}

	return base
}
