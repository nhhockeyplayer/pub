'use strict';

angular
    .module('app', ['ui.bootstrap', 'dk-modal.module'])

    .controller('appController', ['$scope, ', function ($scope) {
        $scope.alertThisModule = function () {
            alert('alerted this module!');
        };
    }]);
