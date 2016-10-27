module.exports = function(grunt) {

    var sourceFiles = grunt.file.readJSON("sourceFiles.json");

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: [sourceFiles]
        },
        concat: {
            engine: {
                src: [sourceFiles],
                dest: 'public/js/build/engine.js'
            },
            game: {
                src: 'game/*.js',
                dest: 'public/js/build/game.js'
            }
        },
        uglify: {
            options: {
                sourceMap: true
            },
            engine: {
                src: [sourceFiles],
                dest: 'public/js/build/engine.min.js'
            },
            game: {
                src: 'game/*.js',
                dest: 'public/js/build/game.min.js'
            }
        },
        watch: {
            engine: {
                files: [sourceFiles],
                tasks:['jshint','concat','uglify']
            },
            game: {
                files: 'game/*.js',
                tasks:['jshint','concat','uglify']
            },
            options: {
                spawn: false,

            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};
