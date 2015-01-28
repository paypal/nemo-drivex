"use strict";

module.exports = function(grunt) {
	grunt.initConfig({
		simplemocha: {
			options: {
				globals: ['should'],
				timeout: 30000,
				ignoreLeaks: false,
				grep: grunt.option('grep') || '',
				ui: 'bdd',
				reporter: 'spec'
			},

			all: {
				src: ['test/*.js']
			}
		},
		jshint: {
			files: ['index.js', 'Gruntfile.js'],
			options: {
				jshintrc: true
			}
		},
		mocha_istanbul: {
			coverage: {
				src: 'test', // a folder works nicely
				options: {
					mask: '*.js',
					grep: grunt.option('grep') || '',
					ui: 'bdd',
					reporter: 'spec',
					timeout: 30000

				}
			}
			//,coverageSpecial: {
			//	src: ['testSpecial/*/*.js', 'testUnique/*/*.js'], // specifying file patterns works as well
			//	options: {
			//		coverageFolder: 'coverageSpecial',
			//		mask: '*.spec.js'
			//	}
			//},
			//coveralls: {
			//	src: ['test', 'testSpecial', 'testUnique'], // multiple folders also works
			//	options: {
			//		coverage:true,
			//		check: {
			//			lines: 75,
			//			statements: 75
			//		},
			//		root: './lib', // define where the cover task should consider the root of libraries that are covered by tests
			//		reportFormats: ['cobertura','lcovonly']
			//	}
			//}
		},
		istanbul_check_coverage: {
			default: {
				options: {
					coverageFolder: 'coverage*', // will check both coverage folders and merge the coverage results
					check: {
						lines: 10,
						statements: 10
					}
				}
			}
		}
	});

	grunt.event.on('coverage', function(lcovFileContents, done){
		// Check below
		done();
	});

	grunt.loadNpmTasks('grunt-mocha-istanbul');

	//possibly use later
	//grunt.registerTask('coveralls', ['mocha_istanbul:coveralls']);
	grunt.registerTask('coverage', ['mocha_istanbul:coverage', 'istanbul_check_coverage']);
	// For this to work, you need to have run `npm install grunt-simple-mocha`
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	// Add a default task. This is optional, of course :)
	grunt.registerTask('default', ['simplemocha', 'jshint']);
	grunt.registerTask('test', ['jshint', 'coverage']);
	// Add a default task. This is optional, of course :)
};