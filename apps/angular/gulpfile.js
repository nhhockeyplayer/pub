/**********************************************
GULP build runner. Version 3.8.5

This is the master build file. It contains tasks that are general
and thus can be called from different build modules if needed.

By creating a build module, the build can function in various ways.
This build currently provides three modes, each file provides more details:
1) you get a near-production version built and deployed to build/ which is the local server root.
2) you may wish to develop from t
he src/ directory directly. in that case, it becomes the server root.
3) a special mode for working on wings-common-ui components while testing them in this project.

Additional build modules are loaded as require() statements at the
end of this file. Due to the nature of how Javascript
is loaded and parsed, these module types need to always
be located there.
**********************************************/

/* global __dirname, require */
'use strict';

// Gulp itself
var gulp = require('gulp');

// Utilities
var path = require('path');
var argv = require('yargs').argv;
var runSequence = require('run-sequence');

// set up useful paths
var gulpComponents = path.join(__dirname, 'gulp-components');

var app = path.join(__dirname, 'app');
var appSrc = path.join(app, 'resources');
var appAssets = path.join(appSrc, 'assets');
var cssDir = path.join(appAssets, 'build', 'css');
var cssSourceMapPath = path.join('..', '..', '..');
var indexTemplate = path.join(app, 'index.html.tmpl');
var libs = path.join(app, 'libs');
var testDir = path.join(__dirname, 'test');
var buildDir = path.join(__dirname, 'build');
var warName = 'hsm-dalmgr';
var sassLoadPath = [
    libs,
    path.join(libs, 'bootstrap-sass', 'assets', 'stylesheets'),
];

var bootstrapFonts = path.join(libs,
                               'bootstrap-sass',
                               'assets',
                               'fonts',
                               '**',
                               '*.{eot,svg,ttf,woff,woff2}');

var fontawesomeFonts = path.join(libs,
                               'fontawesome',
                               'fonts',
                               '*.{eot,svg,ttf,woff,woff2}');

var relativeBuiltResourcesPath = 'resources';

/**
 * Component includes
 */
require(path.join(gulpComponents, 'clean'))(
    app,
    buildDir
);

require(path.join(gulpComponents, 'test'))(
    appSrc,
    testDir,
    libs,
    __dirname
);

require(path.join(gulpComponents, 'dev'))(
    app,
    appSrc,
    libs,
    indexTemplate,
    cssDir,
    buildDir,
    cssSourceMapPath,
    sassLoadPath
);

require(path.join(gulpComponents, 'dev'))(
    app,
    appSrc,
    libs,
    indexTemplate,
    cssDir,
    buildDir,
    cssSourceMapPath,
    sassLoadPath,
    true,
    '_minify-'
);

require(path.join(gulpComponents, 'static-assets'))(
    appSrc,
    appAssets,
    libs,
    [bootstrapFonts, fontawesomeFonts],
    buildDir,
    relativeBuiltResourcesPath
);

/**
 * Get webserver tasks
 * built v. source requires a different webroot
 * vagrant v. gradle run for auth requires a different path
 */
require(path.join(gulpComponents, 'webserver'))(
    app,
    warName + '/',
    '_vagrant-auth-'
);
require(path.join(gulpComponents, 'webserver'))(
    buildDir,
    warName + '/',
    '_build-vagrant-auth-'
);
require(path.join(gulpComponents, 'webserver'))(
    app,
    '',
    '_gradle-run-auth-'
);
require(path.join(gulpComponents, 'webserver'))(
    buildDir,
    '',
    '_build-gradle-run-auth-'
);

/**
 * Dev task
 *
 * Options:
 * `--source` || `-s` : will serve directly from source
 * `--gradleRun` || `-g` : proxies endpoints from gradle run rather than vagrant
 * `--localCommon` || `-l` : copies to bower components and watches for changes
 *                           in local copy of wings-common-ui repository
 */
gulp.task('dev', ['_verify-dev-deps'], function () {
    // check for the --source or -s argument
    var buildStage = (argv.source || argv.s) ? 'source' : 'build';
    // check for the --gradleRun or -g argument
    var authSource = (argv.gradleRun || argv.g) ? 'gradle-run' : 'vagrant';
    // check for the --localCommon or -l argument
    var useLocalCommonUI = (argv.localCommon || argv.l) ? 'sync-common' : 'bower-common';

    // Require webserver configured for deployment method
    require(path.join(gulpComponents, 'webserver'))(
        buildStage === 'source' ? app : buildDir,
        authSource === 'vagrant' ? warName + '/' : ''
    );

    var runList = [];
    // populate runList
    if (useLocalCommonUI === 'sync-common') {
        runList.push('_commonUI-watch');
    }
    if (buildStage === 'source') {
        runList.push('_src-bower-fonts');
        runList.push('_inject-watch');
    } else if (buildStage === 'build') {
        runList.push('_deploy-static-assets-watch');
        runList.push('_concatenate-watch');
    }
    runList.push('_webserver');

    // Start watching code and running tests
    gulp.start('_test-watch');

    // Run tasks in runList
    runSequence.apply(this, runList);
});

/**
 * War tasks (for building war files)
 */

// This is a delegator task which checks for the --source or -s argument
gulp.task('war', ['_verify-dev-deps', '_bower-fonts'], function () {
    var useLocalCommonUI = (argv.localCommon || argv.l) ? 'sync-common' : 'bower-common';
    gulp.start('_' + useLocalCommonUI + '-war');
});

gulp.task('_sync-common-war', function () {
    runSequence(
        '_sync-common-ui-project',
        'test',
        '_minify-concatenate',
        '_deploy-static-assets'
    );
});

gulp.task('_bower-common-war', function () {
    runSequence(
        'test',
        '_minify-concatenate',
        '_deploy-static-assets'
    );
});

// Default Task
gulp.task('default', ['war']);

// gulp default task. runs complete build and deploy without invoking the watcher or server.
gulp.task('build-jenkins', ['_verify-dev-deps'], function () {
    runSequence(
        'clean',
        'lint',
        '_karma-CI',
        '_minify-concatenate',
        '_deploy-static-assets'
    );
});

// Legacy Tasks
gulp.task('build', ['war']);
gulp.task('deploy', ['_deploy-static-assets']);
gulp.task('dev-common', ['_build-dev-gradle-run-auth']);
gulp.task('dev-sass', ['_dev-sass']);
gulp.task('jscs', ['_jscs']);
gulp.task('jshint', ['_jshint']);
gulp.task('karma-test', ['_karma-once']);
gulp.task('karma-test-jenkins', ['_karma-CI']);
gulp.task('karma-watch', ['_karma-watch']);
gulp.task('sass', ['_sass']);
gulp.task('srcDev', ['_source-dev-vagrant-auth']);
gulp.task('watch', ['_lint-watch', '_dev-sass-watch']);
