
module.exports = function(grunt) {
    grunt.registerTask('test', function () {
        console.log("My task is running !");
    });
    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', './*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');

};