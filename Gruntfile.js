/**
 * Created by Guillaume on 11/09/2015.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        jsdoc : {
            dist : {
                src: ['src/*.js', 'test/*.js'],
                options: {
                    destination: 'jsdoc'
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dest/WaitForIt.min.js': ['src/WaitForIt.js']
                }
            }
        },
        watch: {
            options: {
                dateFormat: function(time) {
                    grunt.log.writeln('The watch finished in ' + time + 'ms at' + (new Date()).toString());
                    grunt.log.writeln('Waiting for more changes...');
                }
            },
            scripts: {
                files: '**/*.js',
                tasks: ['jsdoc', 'uglify']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.registerTask('default', ['watch']);
};