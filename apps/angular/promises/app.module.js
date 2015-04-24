'use strict';

angular
    .module('app.module', [])

    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl:    'app.tmpl.html',
                controller:     'app.module.controller'
            });
    })

    .controller('app.module.controller', function ($scope, $q) {
        var defer = $q.defer();

        defer.promise
            .then(function (weapon) {
                alert('I You can have my' + weapon);
                return 'bow';
            })
            .then(function (weapon) {
                alert('and my ' + weapon);
                return 'axe';
            })
            .then(function () {
                 alert('and my' + weapon);
            });

        defer.resolve();

        $scope.model = {
            message: 'This is my app'
        };
    });
