'use strict';
/*global $:false , jQuery:false, myControllers:false*/

module.exports = function(grunt){
    //project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
//        jshint: {
////            src: ['Gruntfile.js', 'public/**/*.js', 'public/js/config.js', 'test/**/*.js'],
//            options: {
//                curly: true,
//                eqeqeq: true,
//                immed: true,
//                latedef: true,
//                newcap: true,
//                noarg: true,
//                sub: true,
//                undef: true,
//                boss: true,
//                eqnull: true,
//                browser: true,
//                globals: {
//                    require: true,
//                    define: true,
//                    requirejs: true,
//                    describe: true,
//                    expect: true,
//                    it: true,
//                    jQuery: true,
//                    $: true,
//                    myControllers: true,
//                    alert: true,
//                    console: true,
//                    services: true
//                }
//            },
//            concat: {
//                src: ['public/js/controllers/*.js', 'public/js/services/*.js'],
//                dest: 'public/js/dest/b.js'
//            }
//        },
        concat: {
            options: {
                separator: ''
            },
            dist: {
                src: ['public/js/controllers/*.js', 'public/js/services/*.js'],
                dest: 'public/js/appFiles.js'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'jshint', 'concat']);

};