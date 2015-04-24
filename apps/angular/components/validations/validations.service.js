'use strict';

angular.module('validations.service', ['jcs-autoValidate'])

    .factory('limitfieldValFact', [
        function () {
            var shouldCompareWith = function (value) {
                if (Number(value) === -1) {
                    // the field has it's no limit box checked
                    return false;
                } else if (!value) {
                    // the field has not been filled out or prepopulated
                    return false;
                } else if (value === '') {
                    // the field has been cleared by the user
                    return false;
                } else {
                    // the field has a value
                    return true;
                }
            };
            var doneValidations = function (failedValidations) {
                // convey the outcome
                if (failedValidations === 0) {
                    return true;
                } else {
                    return false;
                }
            };
            var inAbsBounds = function (scope, thisFieldElm) {
                var failedValidations = 0;
                if (shouldCompareWith(thisFieldElm.$modelValue)) {
                    var thisFieldVal = Number(thisFieldElm.$modelValue);
                    console.log(thisFieldVal + '>' + scope.absBoundHardHigh);
                    if (thisFieldVal > Number(scope.absBoundHardHigh)) {
                        // invalid
                        console.log('invalid!');
                        console.log(thisFieldElm);
                        thisFieldElm.$setValidity('greaterThenAbsLow', false);
                        failedValidations++;
                    } else {
                        // valid
                        thisFieldElm.$setValidity('greaterThenAbsLow', true);
                    }
                    console.log(thisFieldVal + '<' + scope.absBoundHardHigh);
                    if (thisFieldVal < Number(scope.absBoundHardLow)) {
                        console.log('invalid!');
                       // invalid
                        thisFieldElm.$setValidity('lessThenAbsHigh', false);
                        failedValidations++;
                    } else {
                        // valid
                        thisFieldElm.$setValidity('lessThenAbsHigh', true);
                    }
                } else {
                    thisFieldElm.$setValidity('lessThenAbsHigh', true);
                    thisFieldElm.$setValidity('greaterThenAbsLow', true);
                }
                return doneValidations(failedValidations);
            };
            var compareWithHardHighUp = function (scope, flag, thisFieldElm) {
                var failedValidations = 0;
                if (shouldCompareWith(scope.limitfield.hardHigh)) {
                    var upperBound = (Number(scope.limitfield.hardHigh) - Number(scope.precision));
                    console.log(upperBound + '<' + thisFieldElm.$modelValue + 'then false');
                    if (upperBound < thisFieldElm.$modelValue) {
                        scope.$parent.hardHighElm.$setValidity('greaterThen' + flag, false);
                        // scope.$parent.hardHighElm.$setDirty();
                        // above is same as set dirty
                        thisFieldElm.$setValidity('lessThenHardHigh', false);
                        console.log('invalid!');
                        // invalid
                        failedValidations++;
                    } else {
                        // valid
                        scope.$parent.hardHighElm.$setValidity('greaterThen' + flag, true);
                        // scope.$parent.hardHighElm.$setDirty();
                        thisFieldElm.$setValidity('lessThenHardHigh', true);
                    }
                }
                return failedValidations;
            };
            var compareWithSoftHighUp = function (scope, flag, thisFieldElm) {
                var failedValidations = 0;
                if (shouldCompareWith(scope.limitfield.softHigh)) {
                    var upperBound = Number(scope.limitfield.softHigh) - Number(scope.precision);
                    if (upperBound < thisFieldElm.$modelValue) {
                        console.log('invalid!');
                        // invalid
                        scope.$parent.softHighElm.$setValidity('greaterThen' + flag, false);
                        // scope.$parent.softHighElm.
                        thisFieldElm.$setValidity('lessThenSoftHigh', false);
                        failedValidations++;
                    } else {
                        // valid
                        scope.$parent.softHighElm.$setValidity('greaterThen' + flag, true);
                        // scope.$parent.softHighElm.
                        thisFieldElm.$setValidity('lessThenSoftHigh', true);
                    }
                }
                return failedValidations;
            };
            var compareWithSoftLowUp = function (scope, flag, thisFieldElm) {
                var failedValidations = 0;
                if (shouldCompareWith(scope.limitfield.softLow)) {
                    var upperBound = (Number(scope.limitfield.softLow) - Number(scope.precision));
                    if (upperBound < thisFieldElm.$modelValue) {
                        console.log('invalid!');
                        // invalid
                        scope.$parent.softLowElm.$setValidity('greaterThen' + flag, false);
                        // scope.$parent.softLowElm.setDirty();
                        thisFieldElm.$setValidity('lessThenSoftLow', false);
                        failedValidations++;
                    } else {
                        // valid
                        scope.$parent.softLowElm.$setValidity('greaterThen' + flag, true);
                        // scope.$parent.softLowElm.setDirty();
                        thisFieldElm.$setValidity('lessThenSoftLow', true);
                    }
                }
                return failedValidations;
            };
            var validUpwards = function (scope, flag, thisFieldElm) {
                // we cover every comparison by calling this function on each field.
                // it compares it's value with every greater field.
                // errors are called out on each.
                // each field only validates against larger fields.
                // flag serves two purposes. to give us context and to mark the offender.
                var failedValidations = 0;
                // if im empty or no limit all others must be good ;)
                if (shouldCompareWith(thisFieldElm.$modelValue)) {
                    if (flag === 'SoftHigh') {
                        failedValidations += compareWithHardHighUp(scope, flag, thisFieldElm);
                    } else if (flag === 'SoftLow') {
                        failedValidations += compareWithHardHighUp(scope, flag, thisFieldElm);
                        failedValidations += compareWithSoftHighUp(scope, flag, thisFieldElm);
                    } else if (flag === 'HardLow') {
                        failedValidations += compareWithSoftLowUp(scope, flag, thisFieldElm);
                        failedValidations += compareWithHardHighUp(scope, flag, thisFieldElm);
                        failedValidations += compareWithSoftHighUp(scope, flag, thisFieldElm);
                    }
                } else {
                    if (scope.hardHighElm) {
                        scope.hardHighElm.$setValidity('greaterThen' + flag, true);
                        thisFieldElm.$setValidity('lessThenHardHigh', true);
                    }
                    if (scope.softHighElm) {
                        scope.softHighElm.$setValidity('greaterThen' + flag, true);
                        thisFieldElm.$setValidity('lessThenSoftHigh', true);
                    }
                    if (scope.softLowElm) {
                        scope.softLowElm.$setValidity('greaterThen' + flag, true);
                        thisFieldElm.$setValidity('lessThenSoftLow', true);
                    }
                }
                return doneValidations(failedValidations);
            };
            var compareWithHardLowDown = function (scope, flag, thisFieldElm) {
                var failedValidations = 0;
                if (shouldCompareWith(scope.limitfield.hardLow)) {
                    var lowerBound = (Number(scope.limitfield.hardLow) + Number(scope.precision));
                    if (thisFieldElm.$modelValue < lowerBound) {
                        console.log('invalid!');
                        // invalid
                        scope.$parent.hardLowElm.$setValidity('lessThen' + flag, false);
                        thisFieldElm.$setValidity('greaterThenHardLow', false);
                        failedValidations++;
                    } else {
                        // valid
                        scope.$parent.hardLowElm.$setValidity('lessThen' + flag, true);
                        thisFieldElm.$setValidity('greaterThenHardLow', true);
                    }
                }
                return failedValidations;
            };
            var compareWithSoftLowDown = function (scope, flag, thisFieldElm) {
                var failedValidations = 0;
                if (shouldCompareWith(scope.limitfield.softLow)) {
                    var lowerBound = (Number(scope.limitfield.softLow) + Number(scope.precision));
                    if (thisFieldElm.$modelValue < lowerBound) {
                        console.log('invalid!');
                        // invalid
                        scope.$parent.softLowElm.$setValidity('lessThen' + flag, false);
                        thisFieldElm.$setValidity('greaterThenSoftLow', false);
                        failedValidations++;
                    } else {
                        // valid
                        scope.$parent.softLowElm.$setValidity('lessThen' + flag, true);
                        thisFieldElm.$setValidity('greaterThenSoftLow', true);
                    }
                }
                return failedValidations;
            };
            var compareWithSoftHighDown = function (scope, flag, thisFieldElm) {
                var failedValidations = 0;
                if (shouldCompareWith(scope.limitfield.softHigh)) {
                    var lowerBound = (Number(scope.limitfield.softHigh) + Number(scope.precision));
                    if (thisFieldElm.$modelValue < lowerBound) {
                        console.log('invalid!');
                        // invalid
                        scope.$parent.softHighElm.$setValidity('lessThen' + flag, false);
                        thisFieldElm.$setValidity('greaterThenSoftHigh', false);
                        failedValidations++;
                    } else {
                        // valid
                        scope.$parent.softHighElm.$setValidity('lessThen' + flag, true);
                        thisFieldElm.$setValidity('greaterThenSoftHigh', true);
                    }
                }
                return failedValidations;
            };
            var validDownwards = function (scope, flag, thisFieldElm) {

                // we cover every comparison by calling this function on each field.
                // it compares it's value with every greater field.
                // errors are called out on each.
                // each field only validates against larger fields.
                // flag serves two purposes. to give us context and to mark the offender.
                var failedValidations = 0;
                // if im empty or no limit all others must be good ;)
                if (shouldCompareWith(thisFieldElm.$modelValue)) {
                    if (flag === 'SoftLow') {
                        failedValidations += compareWithHardLowDown(scope, flag, thisFieldElm);
                    } else if (flag === 'SoftHigh') {
                        failedValidations += compareWithHardLowDown(scope, flag, thisFieldElm);
                        failedValidations += compareWithSoftLowDown(scope, flag, thisFieldElm);
                    } else if (flag === 'HardHigh') {
                        failedValidations += compareWithHardLowDown(scope, flag, thisFieldElm);
                        failedValidations += compareWithSoftLowDown(scope, flag, thisFieldElm);
                        failedValidations += compareWithSoftHighDown(scope, flag, thisFieldElm);
                    }
                } else {
                    if (scope.hardLowElm) {
                        scope.hardLowElm.$setValidity('lessThen' + flag, true);
                        thisFieldElm.$setValidity('greaterThenHardLow', true);
                    }
                    if (scope.softLowElm) {
                        scope.softLowElm.$setValidity('lessThen' + flag, true);
                        thisFieldElm.$setValidity('greaterThenSoftLow', true);
                    }
                    if (scope.softHighElm) {
                        scope.softHighElm.$setValidity('lessThen' + flag, true);
                        thisFieldElm.$setValidity('greaterThenSoftHigh', true);
                    }
                }
                return doneValidations(failedValidations);
            };
            return {
                shouldCompareWith: shouldCompareWith,
                doneValidations: doneValidations,
                inAbsBounds: inAbsBounds,
                compareWithHardHighUp: compareWithHardHighUp,
                compareWithSoftHighUp: compareWithSoftHighUp,
                compareWithSoftLowUp: compareWithSoftLowUp,
                validUpwards: validUpwards,
                compareWithHardLowDown: compareWithHardLowDown,
                compareWithSoftLowDown: compareWithSoftLowDown,
                compareWithSoftHighDown: compareWithSoftHighDown,
                validDownwards: validDownwards
            };
        }
    ]);
