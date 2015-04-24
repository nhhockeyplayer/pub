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
 * Contains MML Controller application
 */
'use strict';

angular.module('mml.module')
    .controller('MmlController', function (
            $modal,
            $rootScope,
            $translate,
            ErrorHandlerSvc,
            MmlMedicationsTableSort,
            MmlRest,
            MmlSvc) {

        var _this = this;

        // Sets the initial translation of the page when pulling from cookies
        $translate('mml.searchMasterMedicationList').then(function (translation) {
            MmlSvc.selectedCategory.searchBarPlaceHolderText = translation;
        });

        // Sets the initial translation of the page when user changes
        $rootScope.$on('$translateChangeSuccess', function () {
            $translate('mml.searchMasterMedicationList').then(function (translation) {
                MmlSvc.selectedCategory.searchBarPlaceHolderText = translation;
            });
        });

        // defaults the medications table sort order
        MmlMedicationsTableSort.sort.active = 'genericName';

        _this.adding = false;
        _this.alertQty = 4;
        _this.alerts = ErrorHandlerSvc.getAlertList();
        _this.assignCategoryMode = MmlSvc.assignCategoryMode;
        _this.formulary = MmlRest.getFormulary();
        _this.medications = MmlRest.getMedications();
        _this.medicationCategories = MmlRest.getMedicationCategories();
        _this.searchQuery = MmlSvc.searchQuery;
        _this.selectedCategory = MmlSvc.selectedCategory;

        // These rest call functions
        _this.getFormulary = function () {
            MmlSvc.getFormulary();
        };

        _this.getMedicationCategories = function () {
            MmlSvc.getMedicationCategories();
        };

        _this.getMedications = function () {
            MmlSvc.getMedications();
        };

        _this.cancelAssignedCategories = function () {
            MmlSvc.cancelAssignedCategories();
        };

        _this.categorizedViewClicked = function () {
            MmlSvc.searchQuery.query = '';
            MmlMedicationsTableSort.search.categories =
                !MmlMedicationsTableSort.search.categories;
            MmlSvc.changeSearchBarPlaceHolderText(_this.isCategoryViewChecked);
        };

        _this.closeAlert = function (index) {
            ErrorHandlerSvc.closeAlert(index);
        };

        _this.saveAssignedCategories = function () {
            MmlSvc.saveAssignedCategories();
        };

        _this.setTemplate = function () {
            if (_this.isCategoryViewChecked) {
                return 'resources/components/mml/mmlMedicationCategories' +
                    '/mmlMedicationCategories.tmpl.html';
            }
            return 'resources/components/mml/mmlFormulary/mmlFormulary.tmpl.html';
        };

        _this.showSideBar = function () {
            if (_this.adding || _this.isCategoryViewChecked) {
                return true;
            }
            return false;
        };

        // TODO: Convert the DOM minipulation into a directive
        _this.toggleAddMedicationPanel = function () {
            MmlSvc.searchQuery.query = '';
            MmlSvc.focusMMLSearch();
            _this.isCategoryViewDisabled = !_this.isCategoryViewDisabled;
            _this.adding = !_this.adding;
        };

        _this.toggleAssignCategoryMode = function () {
            MmlSvc.checkSelectedCategorizedMedications();
            _this.assignCategoryMode.active = !_this.assignCategoryMode.active;
        };

        // Calls function when controller loads
        _this.getFormulary();
        _this.getMedications();
        _this.getMedicationCategories();
    });
