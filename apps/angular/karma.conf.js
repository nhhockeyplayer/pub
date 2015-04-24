/* global module, require, __dirname */
'use strict';

module.exports = function (config) {
    var path = require('path');

    var app = path.join(__dirname, 'app');
    var libs = path.join(app, 'libs');
    var src = path.join(app, 'resources');
    var tests = path.join(__dirname, 'test');

    config.set({

        /**
         * These are provided in the gulp file.
         *
         * preprocessors:
         * browsers:
         * singleRun:
         */

        files: [
            path.join(libs, 'jquery', 'dist', 'jquery.js'),
            path.join(libs, 'angular', 'angular.js'),
            path.join(libs, 'angular-animate', 'angular-animate.js'),
            path.join(libs, 'angularjs-toaster', 'toaster.js'),
            path.join(libs, 'angular-bootstrap', 'ui-bootstrap-tpls.js'),
            path.join(libs, 'angular-mocks', 'angular-mocks.js'),
            path.join(libs, 'angular-route', 'angular-route.js'),
            path.join(libs, 'angular-cookies', 'angular-cookies.js'),
            path.join(libs, 'angular-dynamic-locale', 'src', 'tmhDynamicLocale.js'),
            path.join(libs, 'angular-translate',  'angular-translate.js'),
            path.join(libs,
                      'angularjs-dropdown-multiselect',
                      'src',
                      'angularjs-dropdown-multiselect.js'),
            path.join(libs, 'angular-auto-validate',  'src', 'jcs-auto-validate.js'),
            path.join(libs, 'angular-modal-service',  'dst', 'angular-modal-service.js'),
            path.join(libs, 'angular-translate-storage-cookie', 'angular-translate-storage-cookie.js'),
            path.join(libs,
                      'angular-translate-loader-static-files',
                      'angular-translate-loader-static-files.js'),
            path.join(libs, 'checklist-model',  'checklist-model.js'),
            path.join(libs, 'valdr', 'valdr.js'),
            path.join(libs, 'angular-ui-router', 'release', 'angular-ui-router.js'),
            path.join(libs, 'wings-common-ui', 'dist', 'wings-common-tmpls.js'),
            path.join(libs, 'wings-common-ui', 'dist', 'wings-common-ui.js'),
            path.join(libs, 'angular-auto-validate', 'dist', 'jcs-auto-validate.js'),
            path.join(src, '**', '*.module.js'),
            path.join(src, '**', '*.html'),
            path.join(src, '**', '*.js'),
            path.join(tests, '**', '*.js'),
        ],

        plugins: [
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage',
            'karma-junit-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        /**
         * frameworks to use
         * available frameworks: https://npmjs.org/browse/keyword/karma-adapter
         */
        frameworks: ['jasmine'],

        /**
         * test results reporter to use
         * possible values: 'dots', 'progress'
         * available reporters: https://npmjs.org/browse/keyword/karma-reporter
         */
        reporters: ['progress', 'junit', 'coverage'],

        // web server port
        port: 9877,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        /** level of logging
         * possible values: config.LOG_DISABLE ||
         *                    config.LOG_ERROR ||
         *                     config.LOG_WARN ||
         *                     config.LOG_INFO ||
         *                     config.LOG_DEBUG
         */
        logLevel: config.LOG_INFO,

        // enable/disable watching file and executing tests whenever any file changes
        autoWatch: true,

        junitReporter: {
            outputFile: 'reports/unit/jasmine-tests.xml'
        },

        ngHtml2JsPreprocessor: {
            // strip app from the file path
            stripPrefix: 'app/'
        },

        coverageReporter: {
            reporters: [
                {type: 'html', dir: 'coverage/', subdir: '.'},
                {type: 'cobertura', dir: 'coverage/', subdir: '.'},
                {type: 'text-summary'}
            ]
        }
    });
};
