"use strict";

module.exports = function(grunt) {
	grunt.initConfig({
		simplemocha: {
			options: {
				globals: ['should'],
				timeout: 30000,
				ignoreLeaks: false,
				grep: '',
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
		}
	});

	// test
	grunt.loadNpmTasks('grunt-simple-mocha');
	// lint
	grunt.loadNpmTasks('grunt-contrib-jshint');
	// default task
	grunt.registerTask('default', ['simplemocha', 'jshint']);
};
