// AngularJS: DropdownMultiselect
// Create a directive for selecting multiple element like checkbox
// built ontop of twitter bootstrap  multi-select-dropdown which is
// built on top of jQuery's multi-select plugin for bootstrap
//

'use strict';

var app = angular.module('app', [])

    .controller('appController', function ($scope) {
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

    })

    .directive('dkmultiselect', function () {
        return {
            restrict: 'E',
            scope: {
                dkStyle: '=',
                model: '=',
                options: '=',
                preSelected: '='
            },
            templateUrl: './dkmultiselect.tmpl.html',
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
                        return 'fa fa-check pull-right';
                    }
                    return false;
                };

                $('.dropdown').bind('keydown', function(evt) {
                    var $this = $(this);
                    switch (evt.keyCode) {
                        case 13: // Enter key
                        case 32: // Space bar
                        case 38: // Up arrow
                        case 40: // Down arrow
                            $this.addClass("open");
                            $this.find('.dropdown-menu a:first').focus();
                            break;
                        case 27: // Escape key
                            $this.removeClass("open");
                            $this.focus();
                            break;
                    }
                });

                $('.dropdown-menu a').bind('keydown', function(evt) {
                    var $this = $(this);

                    function select_previous () {
                        $this.parent('li').prev().find('a').focus();
                        evt.stopPropagation();
                    }

                    function select_next () {
                        $this.parent('li').next().find('a').focus();
                        evt.stopPropagation();
                    }

                    switch (evt.keyCode) {
                        case 13: // Enter key
                        case 32: // Space bar
                            $this.click();
                            $this.closest('.dropdown').removeClass('open');
                            evt.stopPropagation();
                            break;
                        case 9: // Tab key
                            if (evt.shiftKey) {
                                select_previous();
                            } else {
                                select_next();
                            }
                            evt.preventDefault();
                            break;
                        case 38: // Up arrow
                            select_previous();
                            break;
                        case 40: // Down arrow
                            select_next();
                            break;
                    }
                });

            }
        };
    });
