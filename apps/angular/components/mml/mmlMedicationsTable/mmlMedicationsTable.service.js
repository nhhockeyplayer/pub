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
 * Contains MML Medications Table Service application
 *
 * Should perform Filtering, Sorting, Searching functions
 */

'use strict';

angular.module('mmlMedicationsTable.module')
    .factory('MmlMedicationsTableSort', function () {
        var MmlMedicationsTableSort = {};

        MmlMedicationsTableSort.sort = {
            active: '',
            descending: false
        };

        MmlMedicationsTableSort.search = {
            categories: false
        };

        MmlMedicationsTableSort.changeSorting = function (column) {
            if (this.sort.active === column) {
                this.sort.descending = !this.sort.descending;
            } else {
                this.sort.active = column;
                this.sort.descending = false;
            }
        };

        return MmlMedicationsTableSort;
    });
