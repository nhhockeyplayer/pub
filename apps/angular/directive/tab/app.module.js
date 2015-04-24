'use strict';

angular.module('app.module', ['ui.router'])

.config ('tabIndexState', function ($stateProvider) {
    $stateProvider.state('tabIndex', {
        url: '',
        controller: 'dkTabIndexController',
        templateUrl: ''
    });
})

.directive('dkTabs', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            tab:     '@tab',
            context: '@context'
        },
        controller: ['$scope', function ($scope) {
            var panes = $scope.panes = [];

            $scope.select = function (pane) {
                angular.forEach(panes, function (pane) {
                    pane.selected = false;
                });
                pane.selected = true;
            };

            this.addPane = function (pane) {
                if (panes.length === 0) {
                    $scope.select(pane);
                }
                panes.push(pane);
            };
        }],
        templateUrl: './app.tmpl.html',
        replace: true
    };
})

.directive('dkPane', function () {
        require: '^dkTabs',
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            title: '@'
        },
        link: function (scope, element, attrs, tabsCtrl) {
            tabsCtrl.addPane(scope);
        },
        template: '<div class="tab-pane" ng-class="{active: selected}" ng-transclude>' + '</div>',
        replace: true
    };
});
