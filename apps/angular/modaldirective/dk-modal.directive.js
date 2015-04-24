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
 *  Overview
 *      There's no need to make it difficult.
 *      All you need is a simple directive that encapsulates $modal service
 *      found in ui-bootstrap
 *
 *  Abititrary HTML Usage:
 *       <input type="button"
 *           value="Error MODAL"
 *           dk-modal="This world wont be a better place if you delete me?"
 *               dk-type='alert'
 *               dk-icon='fa-times-circle'
 *               dk-title='Error' translate='error'
 *               ng-click="confirmed()" />
 *        <input type="button"
 *            value="Confirmation MODAL"
 *            dk-modal="This world wont be a better place if you delete me?"
 *                dk-type='confirm'
 *                dk-icon='fa-question-circle'
 *                dk-title='Confirm' translate='confirm'
 *                ng-click="confirmed()" />
 *
 *  Abititrary CONTROLLER Usage: NONE
 */
'use strict';

var appModule = angular.module('app.module');

// json serializable safe
var ModalTypeEnum = {
  ALERT: 'alert',
  CONFIRM: 'confirm'
};

var modalType = {
  type: ModalTypeEnum.ALERT
};

appModule.value('MODAL-TYPE', [
    { name: 'INFO', type: 'info', icon: 'fa-info-circle'},
    { name: 'ALERT', type: 'alert', icon: 'fa-exclamation-triangle'},
    { name: 'ERROR', type: 'alert', icon: 'fa-times-circle'},
    { name: 'CONFIRM', type: 'confirm', icon: 'fa-question-circle'},
    { name: 'PROMPT', type: 'prompt', icon: 'fa-question-circle'}
]);

appModule.value('MODAL-BUTTON-TYPE', [
    { name: 'YESNO', type: 'yes-no'},
    { name: 'CONFIRMCANCEL', type: 'confirm-cancel'},
    { name: 'OK', type: 'ok'},
    { name: 'ACCEPTREJECT', type: 'accept-reject'}
]);


angular
.module('dk-modal.directive', ['ui.bootstrap', 'ui.bootstrap.modal'])

.controller('dk-modal.Instance.Controller', ['$scope', '$modalInstance', function ($scope) {

    $scope.setType = function (type) {
        $scope.type = type;
    };

    $scope.setTitle = function (title) {
        $scope.title = title;
    };

    $scope.setIcon = function (icon) {
        $scope.icon = icon;
    };

    $scope.setMessage = function (message) {
        $scope.message = message;
    };

    $scope.confirmed = function () {
        console.log('CONFIRM:dk-modal.Instance.Controller');
    };

    $scope.cancelled = function () {
        console.log('CANCELLED:dk-modal.Instance.Controller');
    };

    $scope.title = ModalTypeEnum.ALERT;
    $scope.title = '';
    $scope.icon = '';
    $scope.message = '';

    //$scope.$watch($scope.message);

}])

.directive('dkModal', ['$modal', '$parse', function ($modal, $parse, type, title, icon, message) {
    return {
        replace: true,
        transclude: true,
        scope: {
            type: '@',
            title: '@',
            icon:  '@',
            message: '@'
        },
        link: function (scope, el, attr) {
            type = attr.dkType;
            title = attr.dkTitle;
            icon = attr.dkIcon;
            message = attr.dkModal;

            el.bind('click', function () {
                var instance = $modal.open({
                    scope:     scope.$root.$new(),
                    type:       attr.dkType,
                    title:      attr.dkTitle,
                    icon:       attr.dkicon,
                    message:    attr.dkModal,

                    resolve: {
                        type: function () {
                            return { type: scope.type };
                        },

                        title: function () {
                            return { title: scope.title };
                        },

                        icon: function () {
                            return { icon: scope.icon };
                        },

                        message: function () {
                            return { message: scope.message };
                        }

                    },

                    reject: {
                        type: '',
                        title: '',
                        icon: '',
                        message: ''
                    },

                    templateUrl: './dk-modal.tmpl.html',
                    controller:     ['$scope', '$modalInstance',
                        function (thisModalScope, modalInstance) {
                            thisModalScope.type = type;
                            thisModalScope.title = title;
                            thisModalScope.icon = icon;
                            thisModalScope.message = message;

                            thisModalScope.ok = function () {
                                modalInstance.close();
                            };
                            thisModalScope.cancel = function () {
                                modalInstance.dismiss();
                            };
                        }],
                    backdrop: 'false',
                    size: 'sm',
                    keyboard: true
                });

                instance.result.then(function () {
                    // close - action!
                    $parse(attr.confirmed)(scope);
                },
                function () {
                    // dimisss - do nothing
                    $parse(attr.cancelled)(scope);
                });
            });
        }
    };
}])

.directive('dkAutoFocus', function ($timeout) {
    var autoFocus = {};
    autoFocus.restrict = 'AE';
    autoFocus.link = function (scope, elem) {
        $timeout(function () {
            $(elem).focus();
        }, 125);
    };

    return autoFocus;
});
