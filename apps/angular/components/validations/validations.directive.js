'use strict';

angular.module('validations.directive', ['jcs-autoValidate', 'validations.service'])
    // built in validators exist but were not working...
    .directive('dkMin', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                scope.$watch(attr.ngMin, function () {
                    ctrl.$setViewValue(ctrl.$viewValue);
                });
                var minValidator = function (value) {
                    var min = scope.$eval(attr.dkMin) || 0;
                    if (!ctrl.$isEmpty(value) && value < min) {
                        ctrl.$setValidity('dkMin', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('dkMin', true);
                        return value;
                    }
                };
                ctrl.$parsers.push(minValidator);
                ctrl.$formatters.push(minValidator);
            }
        };
    })
    // built in validators exist but were not working...
    .directive('dkMax', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                scope.$watch(attr.ngMax, function () {
                    ctrl.$setViewValue(ctrl.$viewValue);
                });
                var maxValidator = function (value) {
                    var max = scope.$eval(attr.dkMax) || Infinity;
                    if (!ctrl.$isEmpty(value) && value > max) {
                        ctrl.$setValidity('dkMax', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('dkMax', true);
                        return value;
                    }
                };
                ctrl.$parsers.push(maxValidator);
                ctrl.$formatters.push(maxValidator);
            }
        };
    })
    // likely the built in angular validators fallback on html5 validators which validate
    // the element rather then the model.
    .directive('dkIsNumber', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                var dkIsNumberValidator = function (value) {
                    // value is inconsistant. using ctrl.$modelValue instead.
                    // is defined here but undefined for dkRequired when the user enters text.
                    if (isNaN(ctrl.$modelValue)) {
                        ctrl.$setValidity('number', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('number', true);
                        return value;
                    }
                };
                ctrl.$parsers.push(dkIsNumberValidator);
                ctrl.$formatters.push(dkIsNumberValidator);
            }
        };
    })
    // likely the built in angular validators fallback on html5 validators which validate
    // the element rather then the model.
    .directive('dkRequired', function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, elem, attr, ctrl) {
                var dkRequiredValidator = function (value) {
                    // value is inconsistant. using ctrl.$modelValue instead.
                    // is undefined here but defined for dkIsNumber when the user enters text.
                    if (!ctrl.$modelValue) {
                        ctrl.$setValidity('required', false);
                        return undefined;
                    } else {
                        ctrl.$setValidity('required', true);
                        return value;
                    }
                };
                ctrl.$parsers.push(dkRequiredValidator);
                ctrl.$formatters.push(dkRequiredValidator);
            }
        };
    })
    .directive('integer', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                var INTEGER_REGEXP = /^\-?\d+$/;
                ctrl.$validators.integer = function (modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be valid
                        return true;
                    }
                    if (INTEGER_REGEXP.test(viewValue)) {
                        // it is valid
                        return true;
                    }
                    // it is invalid
                    return false;
                };
            }
        };
    })

    .directive('validateHardLow', ['limitfieldValFact',
        function (limitfieldValFact) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elm, attrs, thisFieldElm) {
                    // place the ctrl on scope so other can change it's valid state.
                    scope.$parent.hardLowElm = thisFieldElm;
                    var validateFn = function (thisFieldVal) {
                        var thisFieldElm = scope.$parent.hardLowElm;
                        if (!limitfieldValFact.inAbsBounds(scope, thisFieldElm)) {
                            return undefined;
                        }
                        var failedValidations = 0;
                        if (!limitfieldValFact.validDownwards(scope, 'HardLow', thisFieldElm)) {
                            failedValidations++;
                        }
                        if (!limitfieldValFact.validUpwards(scope, 'HardLow', thisFieldElm)) {
                            failedValidations++;
                        }
                        if (failedValidations === 0) {
                            return thisFieldVal;
                        } else {
                            return undefined;
                        }
                    };
                    thisFieldElm.$parsers.push(validateFn);
                    thisFieldElm.$formatters.push(validateFn);
                }
            };
        }
    ])
    .directive('validateSoftLow', ['limitfieldValFact',
        function (limitfieldValFact) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elm, attrs, thisFieldElm) {
                    // place the ctrl on scope so other can change it's valid state.
                    scope.$parent.softLowElm = thisFieldElm;
                    var validateFn = function (thisFieldVal) {
                        var thisFieldElm = scope.$parent.softLowElm;
                        if (!limitfieldValFact.inAbsBounds(scope, thisFieldElm)) {
                            return undefined;
                        }
                        var failedValidations = 0;
                        if (!limitfieldValFact.validDownwards(scope, 'SoftLow', thisFieldElm)) {
                            failedValidations++;
                        }
                        if (!limitfieldValFact.validUpwards(scope, 'SoftLow', thisFieldElm)) {
                            failedValidations++;
                        }
                        if (failedValidations === 0) {
                            return thisFieldVal;
                        } else {
                            return undefined;
                        }
                    };
                    thisFieldElm.$parsers.push(validateFn);
                    thisFieldElm.$formatters.push(validateFn);
                }
            };
        }
    ])
    .directive('validateSoftHigh', ['limitfieldValFact',
        function (limitfieldValFact) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elm, attrs, thisFieldElm) {
                    // place the ctrl on scope so other can change it's valid state.
                    scope.$parent.softHighElm = thisFieldElm;
                    var validateFn = function (thisFieldVal) {
                        var thisFieldElm = scope.$parent.softHighElm;
                        if (!limitfieldValFact.inAbsBounds(scope, thisFieldElm)) {
                            return undefined;
                        }
                        var failedValidations = 0;
                        if (!limitfieldValFact.validDownwards(scope, 'SoftHigh', thisFieldElm)) {
                            failedValidations++;
                        }
                        if (!limitfieldValFact.validUpwards(scope, 'SoftHigh', thisFieldElm)) {
                            failedValidations++;
                        }
                        if (failedValidations === 0) {
                            return thisFieldVal;
                        } else {
                            return undefined;
                        }
                    };
                    thisFieldElm.$parsers.push(validateFn);
                    thisFieldElm.$formatters.push(validateFn);
                }
            };
        }
    ])
    .directive('validateHardHigh', ['limitfieldValFact',
        function (limitfieldValFact) {
            return {
                restrict: 'A',
                require: 'ngModel',
                link: function (scope, elm, attrs, thisFieldElm) {
                    // place the ctrl on scope so other can change it's valid state.
                    scope.$parent.hardHighElm = thisFieldElm;
                    var validateFn = function (thisFieldVal) {
                        var thisFieldElm = scope.$parent.hardHighElm;
                        if (!limitfieldValFact.inAbsBounds(scope, thisFieldElm)) {
                            return undefined;
                        }
                        var failedValidations = 0;
                        if (!limitfieldValFact.validDownwards(scope, 'HardHigh', thisFieldElm)) {
                            failedValidations++;
                        }
                        if (!limitfieldValFact.validUpwards(scope, 'HardHigh', thisFieldElm)) {
                            failedValidations++;
                        }
                        if (failedValidations === 0) {
                            return thisFieldVal;
                        } else {
                            return undefined;
                        }
                    };
                    thisFieldElm.$parsers.push(validateFn);
                    thisFieldElm.$formatters.push(validateFn);
                }
            };
        }
    ]);
   // .controller('demoCtrl', [
   //     '$scope',
   //     'bootstrap3ElementModifier',
   //     function ($scope, bootstrap3ElementModifier) {
   //         $scope.user = {};
   //         $scope.bs3Icons = false;
   //         $scope.toggleBS3Icons = function () {
   //             $scope.bs3Icons = !$scope.bs3Icons;
   //             bootstrap3ElementModifier.enableValidationStateIcons($scope.bs3Icons);
   //         };
   //         $scope.submit = function (frmCtrl) {
   //             $http.post('https://api.app.com/users', $scope.user).then(function (response) {
   //                 if (response.data.validationErrors) {
   //                     angular.forEach(response.data.validationErrors, function (error) {
   //                         frmCtrl.setExternalValidation(error.key,
   //                             error.messageKey, error.message);
   //                     })
   //                 }
   //             });
   //         };
   //         $scope.setExternalError = function (frm) {
   //             frm.setExternalValidation('firstname', undefined, 'hello joe');
   //         };
   //         $scope.toggleBS3Icons();
   //     }
   // ])
