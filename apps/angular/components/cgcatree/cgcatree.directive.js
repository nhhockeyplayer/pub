'use strict';

angular.module('cgcatree.directive', ['cgcatree.controller'])

.directive('cgcatree', ['$parse', '$document', '$compile',
    function () {
        return {
            restrict: 'E',
            replace: true,
            scope: true, // inherited child scope
            templateUrl: 'resources/components/cgcatree/cgcatree.tmpl.html',
            link: function (scope, element, attrs) {
                console.log('Ive added the cgca tree directive!');
            }
        };
    }
]);
