module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			options: {
				livereload: '<%= connect.options.livereload %>',
				debounceDelay: 250
			},
			default: {
				files: [
					'bin-debug/test/*.js'
				],
				tasks: ['concat']
			}
		},
		clean: ['test/**/*.js'],
		connect: {
			options: {
				port: 9001,
				livereload: 35731,
				// change this to '0.0.0.0' to access the server from outside  
				hostname: 'localhost'
			},
			default: {
				options: {
					open: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>/test.html',
				}
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			one: {
				src: ['bin-debug/test/*.js'],
				dest: 'test/test.js',
			},
			main:{
				files:{
					'test/enum.js':['bin-debug/enum/*.js'],
					'test/conf.js':['bin-debug/conf/*.js'],
					'test/model.js':['bin-debug/model/*.js']
				}
			}
		}
	});


	grunt.registerTask('compile', function() {
		grunt.task.run([
			'concat'
		]);
	});



	grunt.registerTask('basic', function() {
		grunt.task.run([
			'clean',
			'compile',
			'connect',
			'watch'
		]);
	});




	grunt.registerTask('default', ['basic']);
};