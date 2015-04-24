// AngularJS: DropdownMultiselect
// Create a directive for selecting multiple element like checkbox
// built ontop of twitter bootstrap  multi-select-dropdown which is
// built on top of jQuery's multi-select plugin for bootstrap
//

'use strict';

var app = angular.module('app', ['app.directives']);

app.controller('', function($scope) {
    $scope.roles = [
        {
            'id': 1,
            'name': 'Manager',
            'assignable': true
        },
        {
            'id': 2,
            'name': 'Developer',
            'assignable': true
        },
        {
            'id': 3,
            'name': 'Reporter',
            'assignable': true
        }
    ];

    $scope.member = {
        roles: []
    };
    $scope.selectedItems = [];

    $scope.title = 'aslihfas title';
});

var app_directives = angular.module('app.directives', []);

app_directives.directive('dropdownMultiselect', function() {
    return {
        restrict: 'E',
        scope: {
            title: '=',
            model: '=',
            options: '=',
            preSelected: '=preSelected'
        },
        template:   '<div class="btn-group" data-ng-class="{open: open}">' +
                        '<button class="btn btn-small">{{title}}</button>' +

                        '<button class="btn btn-small dropdown-toggle" data-ng-click="open=!open;openDropdown()">' +
                        '   <span class="caret"></span>' +
                        '</button>' +

                        '<ul class="dropdown-menu" aria-labelledby="dropdownMenu">' +
                            '<li><a data-ng-click="selectAll()"> <i class="icon-ok-sign"> </i>  Check All</a> </li>' +
                            '<li><a data-ng-click="deselectAll();"> <i class="icon-remove-sign"> </i>  Uncheck All</a> </li>' +
                            '<li class="divider"></li>' +
                            '<li data-ng-repeat="option in options"> ' +
                            '   <a data-ng-click="setSelectedItem()">{{option.name}}' +
                            '       <span data-ng-class="isChecked(option.id)"></span>' +
                            '   </a>' +
                            '</li>' +
                        '</ul>' +

                    '</div>',
        controller: function($scope) {

            $scope.openDropdown = function() {
                $scope.selectedItems = [];
                for (var i = 0; i < $scope.preSelected.length; i++) {
                    $scope.selectedItems.push($scope.preSelected[i].id);
                }
            };

            $scope.selectAll = function() {
                $scope.model = _.pluck($scope.options, 'id');
                console.log($scope.model);
            };

            $scope.deselectAll = function() {
                $scope.model = [];
                console.log($scope.model);
            };

            $scope.setSelectedItem = function() {
                var id = this.option.id;
                if (_.contains($scope.model, id)) {
                    $scope.model = _.without($scope.model, id);
                } else {
                    $scope.model.push(id);
                }
                console.log($scope.model);
                return false;
            };

            $scope.isChecked = function(id) {
                if (_.contains($scope.model, id)) {
                    return 'icon-ok pull-right';
                }
                return false;
            };
        }
    };
});
