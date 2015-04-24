'use strict';

angular.module('jcs-autoValidate')
    .factory('myCustomErrorMessageResolver', ['$q', '$translate',
        function ($q, $translate) {
            // this custom error message resolver wraps the default resolver.
            // this allows us to form messages using non attributes
            var resolve = function (errorType, el) {
                var defer = $q.defer();
                // !! need to adress case where this fails because no msg
                // or obj structure rather then flat.
                $translate('error.' + errorType).then(function (message) {
                    if (errorType === 'greaterThenAbsLow' || errorType === 'lessThenAbsHigh') {
                        var scope = el.scope().$parent;
                        if (scope.absBoundHardLow[0] === '.') {
                            scope.absBoundHardLow = '0' + scope.absBoundHardLow;
                        }
                        message = message.format(scope.absBoundHardLow, scope.absBoundHardHigh);
                        defer.resolve(message);
                    } else {
                        if (el && el.attr) {
                            try {
                                var param = el.attr('ng-' + errorType);
                                if (param === undefined) {
                                    param = el.attr('data-ng-' + errorType) || el.attr(errorType);
                                }
                                param.push(parameter || '');
                                message = message.format(param);
                            } catch (e) {}
                        }
                        defer.resolve(message);
                    }
                });
                return defer.promise;
            };

            return {
                resolve: resolve
            };
        }
    ])
// jscs:disable
/* jshint ignore:start */
    .factory('myCustomElementModifier', ['bootstrap3ElementModifier',
        function (bootstrap3ElementModifier) {
            var factory = {};
            factory.reset = function (el) {
                angular.forEach(el.find('span'), function (spanEl) {
                    spanEl = angular.element(spanEl);
                    if (spanEl.hasClass('error-message-field')) {
                        // spanEl.removeClass('error-msg');
                    }
                    if (spanEl.hasClass('error-msg') || spanEl.hasClass('form-control-feedback') || spanEl.hasClass('control-feedback')) {
                        spanEl.remove();
                    }
                });

                el.removeClass('has-success has-error has-feedback');
            };
            factory.findWithClassElementAsc = function (el, klass) {
                var retuenEl;
                var recursive = function (parent) {
                    if (parent !== undefined) {
                        if (parent.hasClass(klass)) {
                            retuenEl = parent;
                        } else {
                            recursive(angular.element(parent).parent());
                        }
                     }
                 }
                recursive(el);
                return retuenEl;
            };

            factory.findWithClassElementDesc = function (el, klass) {
                var child;
                for (var i = 0; i < el.children.length; i += 1) {
                    child = el.children[i];
                    if (child !== undefined && angular.element(child).hasClass(klass)) {
                        break;
                    } else if (child.children !== undefined) {
                        child = factory.findWithClassElementDesc(child, klass);
                        if (child.length > 0) {
                            break;
                        }
                    }
                }

                return angular.element(child);
            };

            factory.findFormGroupElement = function (el) {
                return factory.findWithClassElementAsc(el, 'form-group');
            };

            factory.findInputGroupElement = function (el) {
                return factory.findWithClassElementDesc(el, 'input-group');
            };

            factory.insertAfter = function (referenceNode, newNode) {
                referenceNode[0].parentNode.insertBefore(newNode[0], referenceNode[0].nextSibling);
            };

            /**
             * @ngdoc property
             * @name bootstrap3ElementModifier#addValidationStateIcons
             * @propertyOf bootstrap3ElementModifier
             * @returns {bool} True if an state icon will be added to the element in the valid and invalid control
             * states.  The default is false.
             */
            factory.addValidationStateIcons = false;

            /**
             * @ngdoc function
             * @name bootstrap3ElementModifier#enableValidationStateIcons
             * @methodOf bootstrap3ElementModifier
             *
             * @description
             * Makes an element appear invalid by apply an icon to the input element.
             *
             * @param {bool} enable - True to enable the icon otherwise false.
             */
            factory.enableValidationStateIcons = function (enable) {
                factory.addValidationStateIcons = enable;
            };
            /**
            * @ngdoc function
            * @name myCustomElementModifier#makeValid
            * @methodOf myCustomElementModifier
            *
            * @description
            * Makes an element appear valid by apply custom styles and child elements.
            *
            * @param {Element} el - The input control element that is the target of the validation.
            */
            factory.makeValid = function (el) {
                var frmGroupEl = factory.findFormGroupElement(el),
                    inputGroupEl;
                    messageEl;

                if (frmGroupEl) {
                    factory.reset(frmGroupEl);
                    inputGroupEl = factory.findInputGroupElement(frmGroupEl[0]);
                    messageEl = frmGroupEl.find('.error-message-field');
                    frmGroupEl.addClass('has-success ' +(inputGroupEl.length > 0 ? '' : 'has-feedback'));
                    if (factory.addValidationStateIcons) {
                        if (inputGroupEl.length > 0) {
                            iconElText = iconElText.replace('form-', '');
                            var iconElText = '<span class="glyphicon glyphicon-ok form-control-feedback"></span>';
                            if (inputGroupEl.length > 0) {
                                iconElText = '<span class="input-group-addon control-feedback">' + iconElText + '</span';
                            }
                            factory.insertAfter(el, angular.element(iconElText));
                        }
                    }
                } else {
                    $log.error('Angular-auto-validate: invalid bs3 form structure elements must be wrapped by a form-group class');
                }
            };

            /**
             * @ngdoc function
             * @name bootstrap3ElementModifier#makeInvalid
             * @methodOf bootstrap3ElementModifier
             *
             * @description
             * Makes an element appear invalid by apply bootstrap 3 specific styles and child elements. If the service
             * property 'addValidationStateIcons' is true it will also append validation glyphicon to the element.
             * See: http://getbootstrap.com/css/#forms-control-validation
             *
             * @param {Element} el - The input control element that is the target of the validation.
             */
            factory.makeInvalid = function (el, errorMsg) {
                var frmGroupEl = factory.findFormGroupElement(el),
                    inputGroupEl,
                    messageEl,
                    helpTextEl;

                if (frmGroupEl) {
                    factory.reset(frmGroupEl);
                    helpTextEl = frmGroupEl.find('.error-message-field');
                    if (helpTextEl.length > 0) {
                        helpTextEl.addClass('help-block');
                        helpTextEl.addClass('has-error');
                        helpTextEl.addClass('error-msg');
                        helpTextEl.html(errorMsg);
                    } else {
                        helpTextEl = angular.element('<span class="help-block has-error error-msg">' + errorMsg + '</span>');
                    }
                    inputGroupEl = factory.findInputGroupElement(frmGroupEl[0]);
                    frmGroupEl.addClass('has-error ' + (inputGroupEl.length > 0 ? '' : 'has-feedback'));
                    factory.insertAfter(inputGroupEl.length > 0 ? inputGroupEl : el, helpTextEl);
                    if (factory.addValidationStateIcons) {
                        if (inputGroupEl.length > 0) {
                            iconElText = iconElText.replace('form-', '');
                            var iconElText = '<span class="glyphicon glyphicon-remove form-control-feedback"></span>';
                            if (inputGroupEl.length > 0) {
                                iconElText = '<span class="input-group-addon control-feedback">' + iconElText + '</span>';
                            }
                            factory.insertAfter(el, angular.element(iconElText));
                        }
                    }
                } else {
                    $log.error('Angular-auto-validate: invalid bs3 form structure elements must be wrapped by a form-group class');
                }
            };

            /**
             * @ngdoc function
             * @name bootstrap3ElementModifier#makeDefault
             * @methodOf bootstrap3ElementModifier
             *
             * @description
             * Makes an element appear in its default visual state by apply bootstrap 3 specific styles and child elements.
             *
             * @param {Element} el - The input control element that is the target of the validation.
             */
            factory.makeDefault = function (el) {
                var frmGroupEl = factory.findFormGroupElement(el);
                if (frmGroupEl) {
                    factory.reset(frmGroupEl);
                } else {
                    $log.error('Angular-auto-validate: invalid bs3 form structure elements must be wrapped by a form-group class');
                }
            };

            factory.key = 'myCustomModifierKey';

            return factory;
        }
    ]);
/* jshint ignore:end */
// jscs:enable
