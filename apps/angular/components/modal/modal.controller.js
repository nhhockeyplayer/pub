'use strict';

angular.module('modal.controller', [])

.controller('BackendErrorCtrl', ['$scope', 'close', 'errors', function ($scope, close, errors) {
    $scope.errors = errors;
    $scope.close = function (result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };
}]);
