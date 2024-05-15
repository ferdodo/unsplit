export default {
	root: "./public",
	build: {
		sourcemap: true
	},
	resolve: {
		alias: {
			"/bundle.js": "../src/index.ts"
		}
	},
};