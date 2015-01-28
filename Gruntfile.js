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
				src: 'test/*.js', // a folder works nicely
				options: {
					mochaOptions: ["--grep", "@waitForElement@"],
					coverage: true,
					timeout: 30000
				}
			}
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
		// use later
		done();
	});

	grunt.loadNpmTasks('grunt-mocha-istanbul');

	grunt.registerTask('coverage', ['mocha_istanbul:coverage', 'istanbul_check_coverage']);
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default', ['simplemocha', 'jshint']);
	grunt.registerTask('test', ['jshint', 'simplemocha']);
	grunt.registerTask('cover', ['coverage']);


};