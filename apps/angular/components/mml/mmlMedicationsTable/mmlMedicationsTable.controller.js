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
 * Contains MML Medications Table Controller application
 */

'use strict';

angular.module('mmlMedicationsTable.module')
    .controller('MmlMedicationsTableController', function (
            $modal,
            MmlMedicationsTableSort,
            MmlRest,
            MmlSvc) {
        var _this = this;

        _this.medications = MmlRest.getMedications();
        _this.sort = MmlMedicationsTableSort.sort;
        _this.selectedCategory = MmlSvc.selectedCategory;
        _this.assignCategoryMode = MmlSvc.assignCategoryMode;
        _this.searchQuery = MmlSvc.searchQuery;
        _this.medicationFilterResult = [];
        _this.selectedMedication = -1;
        _this.hoveredMedication = -1;

        _this.openEditMedicationView = function (medication) {
            $modal.open({
                template: '<pre> editing ' + medication.genericName + ' </pre>',
                backdrop: 'static',
                windowClass: 'custom-medication col-xs-offset-3'
            });
        };

        _this.showEditIcon = function (medicationID) {
            return _this.selectedMedication === medicationID ||
                _this.hoveredMedication === medicationID;
        };

        _this.selectMedication = function (medicationID) {
            if (_this.selectedMedication === medicationID) {
                _this.selectedMedication = -1;
            } else {
                _this.selectedMedication = medicationID;
            }
        };

        _this.hoverMedication = function (medicationID) {
            _this.hoveredMedication = medicationID;
        };

        _this.parseCategories = function (categories) {
            var toolTip = '';

            if (categories.length > 0) {
                angular.forEach(categories, function (cat) {
                    toolTip += cat.name + ', ';
                });
                toolTip = toolTip.substring(0, toolTip.length - 2);
                return toolTip;
            }
        };

        _this.showCustomPic = function (drugCode) {
            return drugCode === null;
        };

        _this.showHighAlertPic = function (highAlert) {
            return highAlert === 'Y';
        };

        _this.tableBodySwitch = function (target) {
            if (MmlSvc.isLoading(target)) {
                return 'loading';
            } else if (typeof _this.medicationFilterResult !== 'undefined' &&
                       _this.medicationFilterResult.length === 0) {
                return 'noMedicationInCategory';
            } else {
                return 'medications';
            }
        };
    });
