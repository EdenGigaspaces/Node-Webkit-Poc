
module.exports = function(grunt) {
    grunt.registerTask('test', function () {
        console.log("My task is running !");
    });
    grunt.registerTask('default', ['jshint']);

    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', './*.js'],
            options: {
                reporter: require('jshint-stylish')
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');

};