/** COPYRIGHT 2014 DEKA RESEARCH AND DEVELOPMENT CORPORATION
 *
 * Contains confidential and proprietary information which
 * may not be copied, disclosed or used by others except as expressly
 * authorized in writing by DEKA Research & Development Corporation.
 */

 /**
 * @file
 * @critical Major Multi-Point
 *
 * Routing
 */

'use strict';

angular.module('hsm-dalmgr')
.config(
    function ($stateProvider, $urlRouterProvider) {
        $stateProvider

        .state('mml', {
            url: '/mml',
            templateUrl: 'resources/components/mml/mml.tmpl.html',
            controller: 'MmlController as Mml',
            authenticate: true,
            roles: ['*']
        })
        .state('cgca', {
            url: '/cgca',
            templateUrl: 'resources/components/cgcatab/cgcatab.tmpl.html',
            //controller: 'CgcatabController',
            authenticate: true,
            roles: ['*']
        })
        .state('dl', {
            url: '/dl',
            templateUrl: 'resources/components/dltab/dltab.tmpl.html',
            authenticate: true,
            roles: ['*']
        })
        .state('landing', {
            url: '/',
            templateUrl: 'resources/components/landing/landing.tmpl.html',
            authenticate: false,
            roles: ['*']
        });

        $urlRouterProvider.otherwise('/');
    });
