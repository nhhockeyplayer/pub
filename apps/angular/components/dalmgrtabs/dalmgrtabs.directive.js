'use strict';

angular.module('dalmgrtabs.directive', [])

.directive('dalmgrmenu', [
    function () {
        return {
            restrict: 'E',
            replace: true,
            controller: function ($state) {},
            templateUrl: 'resources/components/dalmgrtabs/dalmgrtabs.tmpl.html',
            link: function () {}
        };
    }
]);
