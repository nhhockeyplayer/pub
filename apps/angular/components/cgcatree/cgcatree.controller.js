 'use strict';

angular.module('cgcatree.controller', [])
    .controller('CgcatreeController', function ($scope, CgcatabService) {
        CgcatabService.getTree().then(function (careItemsMeta) {
            // add "+ Add Care Group" to the beginning of the list
            careItemsMeta.unshift({id: 'addCG', name: '+ Add Care Group'});
            // add "+ Add Care Area" to each care group
            for (var index in careItemsMeta) {
                if (careItemsMeta[index].careType == 'G') {
                    careItemsMeta[index].children.push({id: 'addCA', name: '+ Add Care Area'});
                }
            }
            // add "+ Add Independent Care Area" to the end of the list
            careItemsMeta.push({id: 'addICA', name: '+ Add Independent Care Area'});
            // todo: code to go through and add expanded class
            $scope.careItems = careItemsMeta;
            $scope.careItemClick = function ($event) {
                $event.stopPropagation();
                var event = angular.element($event.target).scope();
                console.log(event);
                if (event.hasOwnProperty('careItem')) {
                    event.careItem.expanded = event.careItem.expanded ? false : true;
                    if (event.careItem.id == 'addCG') {
                        CgcatabService.createCareGroup();
                    } else if (event.careItem.id == 'addICA') {
                        CgcatabService.createIndependantCareArea();
                    } else if (event.careItem.id == 'addCA') {
                        CgcatabService.createCareArea();
                    } else if (event.careItem.careType == 'A') {
                        $scope.independentCareArea = event.careItem;
                    } else if (event.careItem.careType == 'G') {
                        $scope.careGroup = event.$parent.careItem
                    }
                } else if (event.hasOwnProperty('childCareArea')) {
                    $scope.dependentCareArea = event.childCareArea;
                    $scope.careGroup = event.$parent.careItem;
                }
            }
        });
    });
