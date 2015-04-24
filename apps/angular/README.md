# UI - The Angular App

The front-end application code and assets lives here. Development and deployment of these resources is managed by Gulp as described below.

## Gulp

Gulp is a Node.js based task runner. 

### Setup

To install it for this project, __node__ and __npm__ must be installed on your system, and then an `npm install --global gulp` needs to be run. Additionally for this project, dependencies from __npm__ and __bower__ must be installed as well. __Bower__ must be installed globally with `npm install --global bower`, and then all dependencies can be installed by running `npm install` inside of the _ui_ directory.

### Usage

Once gulp and it's dependencies are installed, a number of tasks are available for use in the _ui_ directory as described below. All other tasks (besides alias tasks) are prepended with **_** and are not meant for direct use.

`gulp dev [-s, --source] [-g --gradleRun]`
    
This task will always:

1. search for, and include in _ui/app/libs_ if found, the local copy of _wings-common-ui_ in any parent directory of the _ui_ folder
1. start a watcher on the _wings-common-ui_ folder to perform copy to the libs directory on changes
1. start a karma server which will watch all javascript in _ui/app_ and _ui/test_ and run tests on changes
1. watch all javascript in _ui/app_ and _ui/test_ and run linters on changes
1. generate an _index.html_ from _ui/app/index.html.tmpl_
1. start a webserver and open a tab in chrome to load the app

This task may be run without argument or with any combination of two pairs of equivalent arguments:

`-s` and `--source`

- *without* either of these arguments, this task will build the project into _ui/build_ with concatenated css and js files, an _index.html_ to load them, and required static assets.
- run with either `-s` or `--source`, this task will construct a _ui/app/index.html_ which loads each javascript file and generated css file directly from the source directory and watches them for changes, reloading when that occurs.

This task may be run without argument or with either of two equivalent arguments, `-g` and `--gradleRun`

- *without* this argument, gulp will proxy endpoints for auth that correspond to the default endpoints provided when the war of this project, built with `gradle war` is served by vagrant
- *with* `-g` or `--gradleRun`, gulp will proxy endpoints for auth that correspond to the default endpoints provided when the application is served by `gradle run`

`gulp lint`

This task runs the jscs and jshint linters on javascript in _ui/app_ and _ui/test_.

`gulp test`

This task runs unit tests with karma runs the jscs and jshint linters on javascript in _ui/app_ and _ui/test_.

`gulp war`

This task does the following:

1. search for, and include in _ui/app/libs_ if found, the local copy of _wings-common-ui_ in any parent directory of the _ui_ folder
1. runs the `test` task as described in this document
1. concatenates and minifies all css and js into vendor and application files of each type and constructs an _index.html_ to load them in the _ui/build_ directory
1. copies static assets from into _ui/build_ to be loaded by the css and javascript


`gulp build-jenkins`

This task is very similar to war with optimizations for CI. It performs the following:

1. search for, and include in _ui/app/libs_ if found, the local copy of _wings-common-ui_ in any parent directory of the _ui_ folder
1. runs jscs and jshint linters
1. runs unit tests with karma using a configuration optimized for continuous integration (no color in output, only headless browser targets)
1. concatenates and minifies all css and js into vendor and application files of each type and constructs an _index.html_ to load them in the _ui/build_ directory
1. copies static assets from into _ui/build_ to be loaded by the css and javascript



### Legacy Tasks

So as not to break some developers current development process, a number of aliases have been set up to enable tasks to be run with alternate names. The following is a list of those tasks.

`gulp build` is equivalent to `gulp war`
`gulp deploy` is equivalent to `gulp _deploy-static-assets`
`gulp dev-common` is equivalent to `gulp _dev`
`gulp dev-sass` is equivalent to `gulp _dev-sass`
`gulp jscs` is equivalent to `gulp _jscs`
`gulp jshint` is equivalent to `gulp _jshint`
`gulp karma-test` is equivalent to `gulp _karma-once`
`gulp karma-test-jenkins` is equivalent to `gulp _karma-CI`
`gulp karma-watch` is equivalent to `gulp _karma-watch`
`gulp sass` is equivalent to `gulp _sass`
`gulp srcDev` is equivalent to `gulp _source-dev`
`gulp watch` is equivalent to `gulp _lint-watch _dev-sass-watch`
