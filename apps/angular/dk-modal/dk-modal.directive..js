/* COPYRIGHT 2015 DEKA RESEARCH AND DEVELOPMENT CORPORATION
 *
 * Contains confidential and proprietary information which
 * may not be copied, disclosed or used by others except as expressly
 * authorized in writing by DEKA Research & Development Corporation.
 *
 * @file
 * @critical HSM DalMgr throughout the whole app
 *
 * dk-modal, depends on  bootstrap
 *
 *
 *
 *  Overview
 *      There's no need to make it difficult.
 *      All you need is a simple directive that encapsulate $modal service
 *      found in ui-bootstrap
 *
 *  Abititrary HTML Usage:
 *          <div ng-app="myApp" ng-controller="AppCtrl">
 *              <dk-modal
 *                  pre-elected = "member.roles"
 *                  model = "selected_items"
 *                  options ="roles">
 *              </dk-modal>
 *              <pre>selected roles = {{selected_items | json}}</pre>
 *          </div>
 *
 *  Abititrary CONTROLLER Usage:
 *      app.controller('AppCtrl', function ($scope){
 *          $scope.roles = [
 *              {"id": 1, "name": "Manager", "assignable": true },
 *                id": 2, "name": "Developer", "assignable": true },
 *                id": 3, "name": "Reporter", "assignable": true }
 *          ];
 *
 *          $scope.member = {roles: []};
 *          $scope.selected_items = [];
 *      });
 *
 *   CamelCase
 *       o html variable-dash used only on directive syntax in directives and in html
 *       o all scope var are camelCase regardless of directive
 *
 */
'use strict';

angular
    .module('dk-modal.directive', ['ui.bootstrap'])

    .controller('dk-modal.directive.Controller', ['$scope', function ($scope, $modal, $parse) {

        $scope.message = 'message set in dk-modal.directive.Controller';

        $scope.alertThisModule = function () {
            console.log('dk-modalModuleController');
        };

    }])

    .directive('confirm', ['$modal', '$parse', function ($modal, $parse) {

        function modalController (modalScope, $modalInstance) {
            modalScope.ok = function () {
                $modalInstance.close();
            };
            modalScope.cancel = function () {
                $modalInstance.dismiss();
            };
        }

        return {
            link: function (scope, el, attr) {
                el.bind('click', function () {
                    var instance = $modal.open({
                        templateUrl: './dk-modal.directive.tmpl.html',
                        controller: ['$scope', '$modalInstance', modalController]
                    });

                    instance.result.then(function () {
                        // close - action!
                        $parse(attr.onConfirm)(scope);
                    }, function () {
                        // dimisss - do nothing
                    });
                });
            }
        };

    }]);
