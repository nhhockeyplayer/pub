'use strict';

angular.module('dashboard.directive', [])

.directive('dashboardmenu', ['$parse', '$document', '$compile',

    function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'resources/components/dashboard/dashboard.tmpl.html',
            link: function (scope, element, attrs) {

            }
        };
    }
]);
