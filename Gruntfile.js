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
        }
    });
    grunt.initConfig({
        uglify: {
            my_target: {
                files: {
                    'dest/WaitForIt.min.js': ['src/WaitForIt.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');
};