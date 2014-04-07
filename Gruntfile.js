/*globals jasmine, requirejs, module */

module.exports = function (grunt) {

    'use strict';

    var rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;

    // show elapsed time at the end
    require('time-grunt')(grunt);

    // load all grunt tasks
    require('load-grunt-tasks')(grunt, { pattern: ['grunt-*', '!grunt-template-jasmine-*'] });

    grunt.initConfig({

        // configurable paths
        conf: {
            app: 'app',
            dist: 'dist',
            test: 'test',
            bin: {
                coverage: 'bin/coverage'
            },
            vendor: [
                '<%= conf.app %>/bower_components/jquery/dist/jquery.js',
                '<%= conf.app %>/bower_components/jasmine-jquery/lib/jasmine-jquery.js',
                '<%= conf.app %>/bower_components/sinonjs-built/pkg/sinon.js',
                '<%= conf.app %>/vendor/jquery-simulate.js'
            ],
            requireConfigPaths: {
                'Squire': '../bower_components/squire/src/Squire',
                'SquireWrapper': '../../test/spec/helpers/SquireWrapper'
            },
            openTarget: 'http://0.0.0.0:9000/index.html',
            middleware: function (connect, options) {
                var middlewares = [rewriteRulesSnippet];
                if (!Array.isArray(options.base)) {
                    options.base = [options.base];
                }
                options.base.forEach(function (base) {
                    // Serve static files.
                    middlewares.push(connect.static(base));
                });
                return middlewares;
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: ['<%= conf.app %>/scripts/**/*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            jstest: {
                files: ['test/spec/**/*.js'],
                tasks: ['test:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            less: {
                files: ['<%= conf.app %>/styles/{,*/}*.less'],
                tasks: ['less:server', 'less:dev', 'autoprefixer']
            },
            styles: {
                files: ['<%= conf.app %>/styles/**/*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= conf.app %>/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= conf.app %>/images/{,*/}*.{gif,jpeg,jpg,png,svg,webp}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= conf.app %>'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= conf.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= conf.dist %>',
                    livereload: false
                }
            }
        },

        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= conf.dist %>/*',
                            '!<%= conf.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: ['.tmp'],
            jasmine: ['bin']
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= conf.app %>/scripts/**/*.js'
            ],
            withOverrides: {
                options: {
                    jshintrc: '<%= conf.test %>/.jshintrc'
                },
                files: {
                    src: [
                        '<%= conf.test %>/spec/**/*.js',
                        '!<%= conf.test %>/spec/helpers/*.js'
                    ]
                }
            }
        },

        jasmine: {

            coverage: {
                src: '<%= conf.app %>/scripts/**/*.js',

                options: {
                    specs: [
                        '<%= conf.test %>/spec/**/*.spec.js'
                    ],
                    keepRunner: true,

                    vendor: '<%= conf.vendor %>',

                    helpers: [
                        '<%= conf.test %>/spec/helpers/*-helper.js'
                    ],

                    template: require('grunt-template-jasmine-istanbul'),

                    templateOptions: {
                        coverage: '<%= conf.bin.coverage %>/coverage.json',
                        report: [
                            {
                                type: 'html',
                                options: {
                                    dir: '<%= conf.bin.coverage %>/html'
                                }
                            },
                            {
                                type: 'text-summary'
                            },
                            {
                                type: 'cobertura',
                                options: {
                                    dir: '<%= conf.bin.coverage %>/cobertura'
                                }
                            }
                        ],
                        // 1. don't replace src for the mixed-in template with instrumented sources
                        replace: false,
                        template: require('grunt-template-jasmine-requirejs'),
                        templateOptions: {

                            requireConfigFile: '<%= conf.app %>/scripts/main.js',
                            requireConfig: {

                                paths: '<%= conf.requireConfigPaths %>',

                                // 2. use the baseUrl you want
                                baseUrl: '<%= conf.app %>/scripts',

                                // 3. pass requirePaths of the sources being instrumented as a configuration option
                                //    these paths should be the same as the jasmine task's src
                                //    unfortunately, grunt.config.get() doesn't work because the config
                                //    is just being evaluated
                                config: {
                                    instrumented: {
                                        src: grunt.file.expand('app/scripts/**/*.js')
                                    }
                                },
                                // 4. use this callback to read the paths of the sources being instrumented and
                                //    redirect requests to them appropriately
                                callback: function () {
                                    define('instrumented', ['module'], function (module) {
                                        return module.config().src;
                                    });
                                    require(['instrumented'], function (instrumented) {
                                        var oldLoad = requirejs.load;
                                        requirejs.load = function (context, moduleName, url) {
                                            // normalize paths
                                            if (url.substring(0, 1) === '/') {
                                                url = url.substring(1);
                                            } else if (url.substring(0, 2) === './') {
                                                url = url.substring(2);
                                            }
                                            // redirect
                                            if (instrumented.indexOf(url) > -1) {
                                                url = '.grunt/grunt-contrib-jasmine/' + url;
                                            }
                                            return oldLoad.apply(this, [context, moduleName, url]);
                                        };
                                    });

                                    jasmine.getJSONFixtures().fixturesPath = 'test/spec/fixtures/json';
                                }
                            }
                        }
                    }
                }
            }
        },

        requirejs: {
            main: {
                options: {
                    name: 'main',
                    baseUrl: 'app/scripts',
                    mainConfigFile: 'app/scripts/main.js',
                    out: 'dist/scripts/main.js',
                    optimize: 'none',
                    //optimize: 'uglify2',
                    //generateSourceMaps: true,
                    preserveLicenseComments: false,
                    paths: {
                    },
                    include: [],
                    exclude: [

                    ]
                }
            }
        },

        rev: {
            dist: {
                files: {
                    src: [
                        '<%= conf.dist %>/scripts/**/*.js',
                        '<%= conf.dist %>/styles/**/*.css'
                    ]
                }
            }
        },

        'string-replace': {
            dist: {
                files: {
                    '<%= conf.dist %>/scripts/': '<%= conf.dist %>/scripts/*.main.js'
                },
                options: {
                    replacements: [
                        {
                            pattern: 'define(\'main\',',
                            replacement: function () {
                                var mainfile = grunt.file.expand('dist/scripts/*.main.js').toString(),
                                    version = mainfile.match(/dist\/scripts\/(.*).main/)[1];
                                return 'define(\'' + version + '.main\',';
                            }
                        }
                    ]
                }
            }
        },

        useminPrepare: {
            options: {
                dest: '<%= conf.dist %>'
            },
            html: [
                '<%= conf.app %>/index.html'
            ]
        },

        usemin: {
            options: {
                assetsDirs: ['<%= conf.dist %>']
            },
            html: ['<%= conf.dist %>/{,*/}*.html'],
            css: ['<%= conf.dist %>/styles/**/*.css']
        },

        cssmin: {

        },

        htmlmin: {
            dist: {
                options: {
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= conf.dist %>',
                        src: '*.html',
                        dest: '<%= conf.dist %>'
                    }
                ]
            }
        },

        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= conf.app %>',
                        dest: '<%= conf.dist %>',
                        src: [
                            'berrycam-server.js',
                            'images/**/*.*',
                            'fonts/**/*.*',
                            'bower_components/requirejs/require.js',
                            '{,*/}*.html',
                            'styles/fonts/**/*.*',
                            'bower_components/bootstrap/fonts/*.*'
                        ]
                    }
                ]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= conf.app %>/styles',
                dest: '.tmp/styles/',
                src: ['**/*.css']
            }
        },

        less: {
            options: {
                paths: ['<%= conf.app %>/bower_components']
            },
            dev: {
                files: {
                    '<%= conf.app %>/styles/main.css': '<%= conf.app %>/styles/main.less'
                }
            },
            dist: {
                options: {
                    yuicompress: true,
                    report: 'gzip'
                },
                files: {
                    '.tmp/styles/main.css': '<%= conf.app %>/styles/main.less'
                }
            },
            server: {
                options: {
                    sourceMap: true,
                    sourceMapBasepath: '<%= conf.app %>/',
                    sourceMapRootpath: '../'
                },
                files: {
                    '.tmp/styles/main.css': '<%= conf.app %>/styles/main.less'
                }
            }
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        }
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            grunt.task.run([
                'build',
                'configureRewriteRules',
                'connect:dist:keepalive'
            ]);
        } else {
            grunt.task.run([
                'clean:server',

                //'concurrent:server',
                'less:server',
                'copy:styles',

                'configureRewriteRules',
                'connect:livereload',
                'watch'
            ]);
        }
    });

    grunt.registerTask('do-string-replace', function () {
        grunt.task.run(['string-replace']);
    });

    grunt.registerTask('test', [
        'clean:jasmine',
        'copy:styles',
        'less:dev',
        'connect:test',
        'jasmine:coverage'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'less:dist',
        'copy:styles',
        'htmlmin',
        'autoprefixer',
        'requirejs',
        'concat',
        'cssmin',
        'copy:dist',
        'rev',
        'do-string-replace',
        'usemin',
        'clean:server'
    ]);

    grunt.registerTask('pi', [
        'build'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);

};
