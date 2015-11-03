module.exports = function(grunt) {

    'use strict';

    require('bsp-grunt')(grunt, {
        bsp: {
            brightspotBase: {
                enable: true
            },

            /** Since there is no pom.xml */
            'maven': {
                'destDir': 'target/brightspot-table-sort',
                'srcDir': 'src'
            },
            
            styles: {
                dir: 'assets/styles',
                less: [
                    ' *.less'
                ],
                autoprefixer: false
            },

            scripts: {
                dir: 'assets/scripts'
            },

            bower: {

                'bsp-tabber': [
                    {
                        src: 'src/css/bsp-tabber.css',
                        dest: '../styles/bower/bsp-tabber.css'
                    },
                    {
                        cwd: 'src/js/',
                        src: '*.js',
                        dest: '',
                        expand: true
                    }
                ],

                'datetimepicker': [
                    {
                        src: 'jquery.datetimepicker.js',
                        dest: 'jquery.datetimepicker.js'
                    },
                    {
                        src: 'jquery.datetimepicker.css',
                        dest: '../styles/bower/jquery.datetimepicker.css'
                    }
                ],

                'vex': [
                    {
                        cwd: 'js/',
                        src: '**/*.js',
                        dest: 'bower/vex',
                        expand: true,
                        flatten: false
                    }
                ]

                // Here you can specify extra bower packages that dont come as part of base if you need them
                // if you add something into bower.json and do NOT specify in here, it will just copy whatever is
                // in that packages' bower.json main entry. Otherwise, you can grab other types of files here

                // example
                //'history.js' : {
                //    src: 'scripts/bundled-uncompressed/html5/native.history.js',
                //    dest: './',
                //    expand: true,
                //    flatten: true
                //}

            }
        },

        /**
         * What's happening here:
         * We're running a standard Brightspot Base SystemJS build to generate
         * a minified JS for the demo.
         * To do that we need to copy files from the module source and the
         * demo source, so we add those paths to the scripts:copy files list.
         */
        copy: {
            scripts: {
                files: [
                    {
                        cwd: '<%= bsp.scripts.srcDir %>',
                        dest: '<%= bsp.scripts.devDir %>',
                        expand: true,
                        src: '**'
                    },
                    {
                        cwd: 'demo/assets/scripts',
                        dest: '<%= bsp.scripts.devDir %>',
                        expand: true,
                        src: '**'
                    },
                    {
                        cwd: 'src',
                        dest: '<%= bsp.scripts.devDir %>',
                        expand: true,
                        src: '**'
                    }
                ]
            }
        }

    });

};