'use strict';

angular.module('limitfields.directive', [])

// this directive hides content while it is loading.
.directive('loading', ['$http',
    function ($http) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs)
            {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v)
                {
                    if (v) {
                        elm.show();
                    } else {
                        elm.hide();
                    }
                });
            }
        };
    }
])

// this directive appends a star to the end of the contents of the div it is placed on.
.directive('requiredlabel', ['$http',
    function ($http) {
        return {
            restrict: 'E',
            link: function (scope, elm, attrs)
            {
                elm.append(' *');
            }
        };
    }
])

// the limitfield dircetive adds visual feedback to make limits easy to work with.
// it does not facilitate validation
// it does not add the inline uom
.directive('limitfield', ['$parse', '$document',
    function ($parse) {
        return {
            restrict: 'E',
            templateUrl: 'resources/components/limitfields/limitfield.tmpl.html',
            scope: {
                ngModel: '=',
                unitOfMeasure: '='
            },
            replace: true,
            require: 'ngModel',
            link: function (scope, element, attrs, modelCtrl) {
                // a wireframe update will likely require the addition of units of
                // measure conditionally in each field.
                // the four lines of code below is a start to this.
//                 scope.text = angular.element(
//                         '<div class="inlineUom">' + scope.inlineUom + '</div>');
//                 scope.text.insertAfter(element);
//                 $compile(scope.text)(scope);
                // get references to dom elements.
                // we must watch the actual elements for blur and focus events.
                // change events double fire in angular. they do not in dom.
                // facilitate interaction feedback
                scope.modelCtrl = modelCtrl;
                scope.element = element;
                var checkboxElement = $(element.find('input[type=checkbox]')[0]);
                var numberfieldElement = $(element.find('input[type=text]')[0]);
                scope.promoteNextChangeCheckbox = true;
                scope.promoteNextChangeNumberfield = true;
                scope.boxType = null;

                // actually the change event.
                numberfieldElement.on('keyup', function () {
                    scope.modelCtrl.$setDirty();
                    // uncheck no limit checkbox
                    scope.checkbox = false;
                    scope.ngModel = this.value;
                });
                numberfieldElement.bind('blur', function () {
                    // restore placeholder text
                    if (scope.numberfield === '' && scope.ngModel === -1) {
                        scope.numberfield = 'No Limit';
                        scope.boxType = 'text';
                        scope.showUOM = false;
                    }
                });
                numberfieldElement.bind('focus', function () {
                    // clear placeholder text
                    if (scope.numberfield !== scope.ngModel) {
                        scope.numberfield = '';
                        scope.boxType = 'number';
                    }
                });

                checkboxElement.bind('change', function () {
                    scope.modelCtrl.$setDirty();
                    if (this.checked === true) {
                        // -1 indicates no limit.
                        scope.ngModel = -1;
                        scope.numberfield = 'No Limit';
                        scope.boxType = 'text';
                        scope.showUOM = false;
                    } else {
                        // share this value with the outside world
                        scope.ngModel = null;
                        scope.showUOM = true;
                        scope.boxType = 'number';
                        scope.numberfield = '';
                    }
                });

                // on load/initialization
                if (scope.ngModel === -1) {
                    scope.numberfield = 'No Limit';
                    scope.boxType = 'text';
                    scope.showUOM = false;
                    scope.checkbox = true;
                } else {
                    scope.boxType = 'number';
                    scope.checkbox = false;
                    scope.showUOM = true;
                    scope.numberfield = scope.ngModel;
                }

            }
        };
    }
])

.directive('limitfields', ['$parse', '$document', '$compile',
    function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                limitfield: '=limitsModel',
                limitfieldElms: '=',
                absBoundHardHigh: '@',
                absBoundHardLow: '@',
                precision: '@',
                unitOfMeasure: '@',
                disabled: '='
            },
            templateUrl: 'resources/components/limitfields/limitfields.tmpl.html',
            link: function (scope, element, attrs) {
                // note: difficult to parse html. revist when the uom is in header.
                // we pass flags because the obj may not exist on scope.

                // scope decides if it should show fields using a bool.
                scope.config = {
                    show: {}
                };
                // check the attribute rather binding to it because the
                // bound value will always be undefined.
                scope.config.show.hardHigh =  (attrs.containsHardHigh !== undefined);
                scope.config.show.softHigh =  (attrs.containsSoftHigh !== undefined);
                scope.config.show.dflt =  (attrs.containsDflt !== undefined);
                scope.config.show.softLow =  (attrs.containsSoftLow !== undefined);
                scope.config.show.hardLow =  (attrs.containsHardLow !== undefined);

                // count the number of fields to display.
                var limitfieldsCount = 0;
                for (var key in scope.config.show) {
                    if (scope.config.show[key]) {
                        limitfieldsCount++;
                    }
                }

                scope.config.inputWidth = String(100 / limitfieldsCount) + '%';

            }
        };
    }
]);
