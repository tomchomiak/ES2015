module.exports = function () {

	return {

		readme: [
			'./README.md'
		],
		css: [
			'./src/client/css/**/*.css'
		],
		js: [
			'./src/client/js/**/*.js'
		],
		html: [
			'./src/client/**/*.html'
		],
		images: [
			'./src/client/images/**/*.jpg',
			'./src/client/images/**/*.jpeg',
			'./src/client/images/**/*.png',
			'./src/client/images/**/*.gif',
			'./src/client/images/**/*.svg',
			'./src/client/images/**/*.ico'
		],
		server: [
			'./src/server/'
		],
		client: [
			'./src/client/'
		],
		vendor: {
			bower: './vendor/bower_components',
			other: [
				'./vendor/other/**/*'
			]
		},
		dist: [
			'./dist/'
		],
		main: './src/server/app.js',
		port: 5000,
		browserSync: {
			port: 4000,
			ghostMode: {
				clicks: false,
				location: false,
				forms: false,
				scroll: false
			}

		},
		wiredep:{
			ignorePath: "../..",
			overrides: {
			  bootstrap: {
			    main: [
			      "./dist/css/bootstrap.css",
			      "./dist/js/bootstrap.js"
			    ]
			  }
			}
		}
	}
}