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
    .filter('searchQueryFilter', function () {
        return function (input, query) {
            // Compare the required filds to the search query case-insensitively using regex
            var queryRegex = new RegExp(query, 'i');
            return input.filter(function (medication) {
                return queryRegex.test(medication.altName1) ||
                       queryRegex.test(medication.altName2) ||
                       queryRegex.test(medication.genericName) ||
                       queryRegex.test(medication.pumpDisplayName);
            });
        };

    });
