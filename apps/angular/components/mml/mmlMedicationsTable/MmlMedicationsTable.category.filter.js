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
    .filter('categoryFilter', function () {
        var filter;

        var categorizedFilter = function (input, categoryId) {
            var output = [];
            angular.forEach(input, function (medication) {
                angular.forEach(medication.categories, function (category) {
                    if (category.id === categoryId) {
                        output.push(medication);
                    }
                });
            });
            return output;
        };

        var uncategorizedFilter = function (input) {
            var output = [];
            angular.forEach(input, function (medication) {
                if (medication.categories.length === 0) {
                    output.push(medication);
                }
            });
            return output;
        };

        filter = function (input, categoryId, stopFilter) {
            if (stopFilter) {
                return input;
            }
            switch (categoryId) {
                case -1: {
                    return input;
                }
                case 0: {
                    return uncategorizedFilter(input);
                }
                default: {
                    return categorizedFilter(input, categoryId);
                }
            }
        };

        return filter;
    });
