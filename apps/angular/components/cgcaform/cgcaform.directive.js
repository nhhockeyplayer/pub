'use strict';

angular.module('cgcaform.directive', ['cgcatab.service', 'angularModalService'])

.directive('careitemform',
    ['$parse', '$q', '$translate', 'CgcatabService', 'ModalService', 'validationManager',
    function ($parse, $q, $translate, CgcatabService, ModalService, validationManager) {
        return {
            restrict: 'E',
            templateUrl: 'resources/components/cgcaform/cgcaform.careitem.tmpl.html',
            link: function (scope, element, attrs) {
                var _this = {};
                scope.element = element;
                scope.shared = CgcatabService.share;
                scope.options = {};
                scope.config  = {
                    show: false,
                    activeTab: null,
                    enableDevice: {
                        LVP: false,
                        Syringe: false
                    },
                    medCategories: {
                        settings: {
                            displayProp: 'name',
                            buttonClasses: 'btn btn-sm multiselect',
                            smartButtonMaxItems: 1
                        },
                        translationTexts: {
                            buttonDefaultText: $translate.instant('assignMedicationCategories'),
                            dynamicButtonTextSuffix: $translate.instant('medCategoriesSelected'),
                            selectionOf: $translate.instant('selectionOf')
                        }
                    }
                };

                scope.tabchange = function (tab) {
                    if (scope.config.activeTab !== null) {
                        var deviceFormName = 'deviceForm' + scope.config.activeTab;
                        if (scope.careItemForm[deviceFormName].$valid) {
                            scope.config.activeTab = tab;
                        }
                    } else {
                        scope.config.activeTab = tab;
                    }
                }

                scope.configureCareGroup = function () {
                    var promise = {};
                    promise.careCategories = CgcatabService.getCareCategories();
                    promise.medicationCategories =
                        CgcatabService.getMedicationCategories();

                    promise.careCategories.then(function (careCategories) {
                        scope.options.careCategories = careCategories;
                    });

                    promise.medicationCategories.then(function (medicationCategories) {
                        scope.options.medicationCategories = medicationCategories;
                    });

                    // the associateCareGroup method is running before population.
                    // fix scope if issues appear.
                    return $q.all([
                        promise.careCategories,
                        promise.medicationCategories
                    ]);
                };

                scope.configureIndependentCareArea = function () {
                };

                scope.configureCareArea = function () {
                    var promise;
                    promise = CgcatabService.getCareAreaTypes();
                    return promise;
                };

                scope.save = function () {
                    // angular-auto-validate validates before calling save.
                    // ideally it would validate all parts of the form, however it validates visible
                    // ait assumes we do not want to validate hidden. currently we don't.
                    // we don't allow a tabchange unless the deviceForm is valid
                    // we  have two seperate forms each individually adressable.
                    // you can never pass the forms or the dom form elements to
                    // angular-auto-validate's validateForm method.
                    // var deviceSelector;
                    // var deviceElm;
                    // var valid = true;
                    // for (var device in scope.config.enableDevice) {
                    //     if (valid) {
                    //         scope.config.activeTab = device;
                    //         deviceSelector = 'deviceform[device-type="' + device + '"]';
                    //         deviceElm = scope.element.find(deviceSelector);
                    //         valid = validationManager.validateForm(deviceElm);
                    //     }
                    // }
                    // if (valid) {
                    //     valid = validationManager.validateForm(scope.element);
                    // }
                    // for (var i = 0; i < scope.config.enableDevice.length; i++) {
                    //     scope.config.activeTab[scope.config.enableDevice]
                    //     validationManager.validateForm(scope.element.find(deviceForm));
                    // }
                    // validationManager.validateForm(scope.careItemForm);

                    var promise;
                    // devices must exist on scope.  we remove non enabled devices before save.
                    // perhaps move the enabled flag elsewhere or pass to the rest service?
                    var device = null;
                    for (var key in scope.shared.activeCareItem.devices) {
                        if (scope.shared.activeCareItem.devices.hasOwnProperty(key)) {
                            device = scope.shared.activeCareItem.devices[key];
                            if (!scope.config.enableDevice[device.deviceType]) {
                                delete scope.shared.activeCareItem.devices[key];
                            }
                        }
                    }
                    // call the appropriate rest service.
                    if (scope.shared.activeCareItem.id) {
                        promise = CgcatabService.updateCareItem(scope.shared.activeCareItem);
                    } else {
                        promise = CgcatabService.addCareItem(scope.shared.activeCareItem);
                    }
                    // handle it's response.
                    promise.then(function (data) {
                        if (!data.success) {
                            ModalService.showModal({
                                templateUrl: 'resources/components/modal/backenderror.tmpl.html',
                                controller: 'BackendErrorCtrl',
                                inputs: {errors: data.errors}
                            }).then(function (modal) {
                                //it's a bootstrap element, use 'modal' to show it
                                modal.element.modal();
                                // modal.close.then(function (result) {
                                    // can specify evens here
                                // });
                            });
                        }
                    });
                };

                scope.cancel = function () {
                    scope.careItemForm.$setPristine();
                    CgcatabService.share.activeCareitem = null;
                    CgcatabService.share.activeTab = null;
                    scope.config.show = false;
                };

                scope.initialize = function () {
                    if (scope.shared.activeCareItem.careType === 'G') {
                        scope.configureCareGroup();
                    }

                    if (scope.shared.activeCareItem.careType === 'A') {
                        scope.configureCareArea();
                    }

                    if (scope.shared.activeCareItem.parentId != null) {
                        scope.configureIndependentCareArea();
                    }
                };

                scope.$watch('shared.activeCareItem', function () {
                    if (scope.shared.activeCareItem === null) {
                        scope.config.show = false;
                    } else {
                        scope.initialize();
                        scope.config.show = true;
                    }
                });

                scope.$watch('config.activeTab', function () {
                    if (scope.config.activeTab != null) {
                        scope.config.enableDevice[scope.config.activeTab] = true;
                    }
                });

            }
        };
    }
])

.directive('deviceform', ['$parse', 'CgcatabService',
    function ($parse, CgcatabService) {
        return {
            restrict: 'E',
            scope: {
                device: '=',
                deviceType: '@',
                enabled: '='
            },
            templateUrl: 'resources/components/cgcaform/cgcaform.device.tmpl.html',
            require: '^form',
            link: function (scope, element, attrs, formCtrl) {
                scope.shared = CgcatabService.share;
                scope.options = {};

                scope.$watch('enabled', function (newValue) {
                    if (newValue === false) {
                        // we called getDeviceDefaults when loading the tab to cache
                        CgcatabService.createDevice(scope.deviceType)
                        .then(function (device) {
                            scope.device = device;
                        });
                        // scope.formCtrl.deviceForm.$setPristine();
                        // scope.formCtrl.deviceForm.$setValidity(something goes here?);
                    }
                });

                scope.initialize = function () {
                    // we will need to reset pristine and valid later
                    scope.formCtrl = formCtrl;
                    CgcatabService.getOcclSensitivity().then(function (occlSensitivity) {
                        scope.options.occlSensitivity = occlSensitivity;
                    });
                    CgcatabService.getAirIfuLim().then(function (airIfuLim) {
                        scope.options.airIfuLim = airIfuLim;
                    });
                    if (scope.device) {
                        console.log('device');
                        scope.enabled = true;
                    } else {
                        // we must have a model on scope.
                        CgcatabService.createDevice(scope.deviceType)
                        .then(function (device) {
                            scope.device = device;
                        });
                        // this triggers our watch
                    }
                };

                scope.initialize();
            }
        };
    }
])
.directive('clearable', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            scope: {
                ngModel: '='
            },
            link: function (scope, fieldElement, attrs) {
                scope.fieldElement = fieldElement;
                if (!fieldElement.hasClass('InputAddOn-field')) {
                    // we need to wrap it in a flexbox.
                    fieldElement.wrap('<div class="InputAddOn"><div>');
                    fieldElement.addClass('InputAddOn-field');
                    if (fieldElement.hasClass('last-child')) {
                        fieldElement.removeClass('last-child');
                    }
                    if (fieldElement.hasClass('only-child')) {
                        fieldElement.removeClass('only-child');
                    }
                }
                var xElement = angular.element(
                    '<span class="InputAddOn-item last-child" ng-click="clear()">x</span>');
                var compXElement = $compile(xElement)(scope);
                xElement.insertAfter(fieldElement);
                scope.clear = function () {
                    scope.ngModel = '';
                };
            }
        };
    }
])
.directive('callbackalerts', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'resources/components/cgcaform/cgcaform.callbackalerts.tmpl.html',
            scope: {
                device: '='
            },
            link: function (scope, fieldElement, attrs) {
                scope.promote = function () {

                };
                scope.demote = function () {

                };
            }
        };
    }
])
.directive('relativeHeightCgca', function ($window) {
    return function (scope, element, attrs) {
        scope.element = element;
        scope.offsetHeight;
        scope.windowHeight;

        function getWindowHeight() {
            // Get the height of the window
            scope.windowHeight = $window.innerHeight;
            return scope.windowHeight;
        }
        function getOffsettHeight() {
            scope.offsetHeight = scope.element[0].getBoundingClientRect().top;
            return scope.offsetHeight;
        }
        function setAdjustedHeight(newValue) {
            // Set the adjustedHeight to window Height - the offset-height
            // the following will fail for hidden
            // this will
            scope.offsetHeight = scope.element[0].getBoundingClientRect().top;
            var height = (scope.windowHeight - scope.offsetHeight) + 'px';
            scope.element.css('height', height);
            scope.element.css('overflowX', 'hidden');
        }

        scope.$watch(getWindowHeight, setAdjustedHeight);
        scope.$watch(getOffsettHeight, setAdjustedHeight);
        // On a resize event to the window, apply the scope
        angular.element($window).bind('resize', function () {
            scope.$apply();
        });
    };
});
