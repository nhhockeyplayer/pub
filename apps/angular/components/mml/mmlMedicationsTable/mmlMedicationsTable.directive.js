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
 * Contains MML Medications Table Directive application
 */
'use strict';

angular.module('mmlMedicationsTable.module')
    .directive('mmlMedicationsTableHeader', function (MmlMedicationsTableSort) {
        var tableHeader = {};

        tableHeader.scope = {
            column: '='
        };

        tableHeader.restrict = 'AE';

        tableHeader.template =
            '<span class="med-table-header" ' +
            'ng-mouseover="onHoverOver(true)" ng-mouseleave="onHoverOver(false)" ' +
            'ng-click="changeSorting(column)">' +
                '<ng-transclude></ng-transclude>' +
                '<i class="glyphicon" ng-class="getIcon(column)"></i>' +
            '</span>';

        tableHeader.transclude = true;

        tableHeader.link = function (scope) {
            scope.isHoveredOver = false;

            scope.onHoverOver = function (value) {
                scope.isHoveredOver = value;
            };

            scope.changeSorting = function (column) {
                MmlMedicationsTableSort.changeSorting(column);
            };

            scope.getIcon = function (column) {
                if (MmlMedicationsTableSort.sort.active === column) {
                    return MmlMedicationsTableSort.sort.descending ?
                        'glyphicon-chevron-up' :
                        'glyphicon-chevron-down';
                } else if (MmlMedicationsTableSort.sort.active !== column && scope.isHoveredOver) {
                    return 'glyphicon-chevron-down';
                }

                return 'glyphicon-none';
            };
        };

        return tableHeader;
    });
