angular.module('app', ['ui.router'])

    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/tab/1');

        $stateProvider.state('app', {
            url: "/tab",
            abstract: true,
            template: "<div ui-view></div>"
        }).state('app.tab', {
            /*
             * templateUrl: function ($stateParams) { return
             * 'partials/' + $stateParams.tab + '.html'; },
             */
            url: '/:tab',
            template: function($stateParams) {
                return '<h2>This is tab ' + $stateParams.tab
                    + '</h2>';
            },

            controller: function($scope, $state, $stateParams,
                $rootScope, $log) {
                $rootScope.tab = parseInt($stateParams.tab);
            }
        });
    }).run(function() {});
