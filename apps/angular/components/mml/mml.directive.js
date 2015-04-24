/** COPYRIGHT 2014 DEKA RESEARCH AND DEVELOPMENT CORPORATION
 *
 * Contains confidential and proprietary information which
 * may not be copied, disclosed or used by others except as expressly
 * authorized in writing by DEKA Research & Development Corporation.
 */

 /**
 * @file
 * @critical Major Multi-Point
 *
 * Contains MML Directive application
 *
 * Function 1: Its job is to find the difference between the the viewport
 * height and height of (common header, tabs, dashboard menu and mmlHeader).
 * It will then set the calling directive element's height using that difference.
 *
 * Function 2: Its job is to find the difference stated in Function 1 and the
 * difference of the (sidebar header and sidebar footer).  It will then set
 * the sidebar-body's height using that difference.
 *
 * works only in MML
 * uses JQuery

 * To apply this function to an element
 * <div adjust-height>
 * </div>

 * To apply this function to an element using a sidebar
 * <div adjust-height>
 *    <div class="sidebar-head"></div>
 *    <div class="sidebar-body"></div>
 *    <div class="sidebar-footer"></div>
 * </div>
 */
'use strict';

angular.module('mml.module')
    .directive('adjustHeight', function ($window) {
        var adjustHeight = {};

        adjustHeight.restrict = 'AE';
        adjustHeight.link = function (scope, element, attrs) {
            var adjustedHeight = 0;

            var html = $(element).parents('html');
            var commonHeader = html.find('#commonheader').outerHeight(true);
            var dalmgrtabs = html.find('#dalmgrtabs').outerHeight(true);
            var dashboardMenu = html.find('.dashboardMenu').outerHeight(true);
            var mmlHeader = html.find('#mml-header').outerHeight(true);
            scope.commonheader = commonHeader;

            var medTableElement = html.find('#medications-table').height();
            var medTableOuter = html.find('#medications-table').outerHeight(true);

            scope.setAdjustedHeight = function () {
                var sidebar = $(element);

                var sidebarHead = sidebar.find('.sidebar-head').outerHeight(true);
                var sidebarBody = sidebar.find('.sidebar-body');

                var sidebarFooter = sidebar.find('.sidebar-footer');
                var footerOptions = sidebarFooter.find('label').outerHeight(true);
                var footerButtons = sidebarFooter.find('.buttons').outerHeight(true);

                adjustedHeight =
                    $window.innerHeight -
                    (commonHeader + dalmgrtabs + dashboardMenu + mmlHeader) -
                    (medTableOuter - medTableElement);

                if (sidebarHead) {
                    var sideBarAdjustedHeight =
                        adjustedHeight - sidebarHead - footerOptions - footerButtons;

                    if (sideBarAdjustedHeight < 0) {
                        sideBarAdjustedHeight = 0;
                    }

                    // sets the sidebar-body's height
                    sidebarBody.attr('style', 'height:' + sideBarAdjustedHeight + 'px');
                }

                // sets the element's height
                attrs.$set('style', 'height:' + adjustedHeight + 'px');
            };

            scope.$watch(function () {
                return $window.innerHeight;
            }, function () {
                scope.setAdjustedHeight();
            });

            angular.element($window).on('resize', function () {
                scope.$apply();
            });
        };

        return adjustHeight;
    });
