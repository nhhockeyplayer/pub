'use strict';

angular
    .module('app.module', ['ui.bootstrap', 'dk-modal.module'])

    .controller('app.module.controller', ['$scope', function ($scope) {

        $scope.alertThisModule = function () {
            alert('alerted this module!');
        };

    }]);
