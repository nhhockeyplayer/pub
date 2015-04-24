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
 * Contains MML Service application
 *
 */

'use strict';

angular.module('mml.module')
    .factory('MmlSvc', function ($translate, toaster, MmlRest) {
        var mml = {};

        mml.assignCategoryMode = { active: false };
        mml.searchQuery = {query: ''};

        /**
         * This variable is for the selecting a category to filter
         * An id > 0  represents a category id
         * An id === 0 represents "Uncategorized List" selected
         * An id === -1 represents "All Medications" selected
         */
        mml.selectedCategory = {
            id: -1,
            name: '',
            searchBarPlaceHolderText: ' '
        };

        mml.cancelAssignedCategories = function () {
            mml.assignCategoryMode.active = false;
            MmlRest.getMedications.checklist = [];
            mml.selectedCategory.id = 0;
            mml.selectedCategory.name = '';
            mml.selectedCategory.searchBarPlaceHolderText = '';
        };

        mml.changeSearchBarPlaceHolderText = function (isCategoryViewChecked) {
            var search = '';
            var searchMasterMedicationList = '';
            var uncategorizedList = '';

            $translate([
                'mml.search',
                'mml.searchMasterMedicationList',
                'mml.uncategorizedList'])
            .then(function (translation) {
                search = translation['mml.search'];
                searchMasterMedicationList = translation['mml.searchMasterMedicationList'];
                uncategorizedList = translation['mml.uncategorizedList'];

                if (isCategoryViewChecked) {
                    mml.selectedCategory.id = 0;
                    mml.selectedCategory.name = uncategorizedList;
                    mml.selectedCategory.searchBarPlaceHolderText =
                        search + ' ' + uncategorizedList;
                } else {
                    mml.selectedCategory.id = -1;
                    mml.selectedCategory.name = '';
                    mml.selectedCategory.searchBarPlaceHolderText = searchMasterMedicationList;
                }
            });
        };

        // selects the checkbox of medications in the current
        // selected category during assignCategoryMode
        mml.checkSelectedCategorizedMedications = function () {
            var meds = MmlRest.getMedications();
            meds.checklist = [];
            angular.forEach(meds.medications, function (medication) {
                angular.forEach(medication.categories, function (category) {
                    if (category.id === mml.selectedCategory.id) {
                        meds.checklist.push(medication.id);
                    }
                });
            });
        };

        mml.focusMMLSearch = function () {
            angular.element('#master-medication-list-search').focus();
        };

        mml.getFormulary = function () {
            MmlRest.fetchFormulary().then(function () {
                MmlRest.getFormulary().checklist = [];
                mml.matchDrugCode(MmlRest.getFormulary(), MmlRest.getMedications());
            });
        };

        mml.getMedicationCategories = function () {
            MmlRest.fetchMedicationCategories();
        };

        mml.getMedications = function () {
            MmlRest.fetchMedications().then(function () {
                mml.matchDrugCode(MmlRest.getFormulary(), MmlRest.getMedications());
                if (MmlRest.getMedications().medications.length > 1) {
                    mml.focusMMLSearch();
                }
            });
        };

        mml.isLoading = function (target) {
            return (target instanceof Array && target.length === 0);
        };

        mml.matchDrugCode = function (frms, medication) {
            var checklist = frms.checklist;
            var prevAdded = frms.prevAdded;
            var frmMeds =  frms.medications;
            var meds = medication.medications;

            angular.forEach(meds, function (med) {
                angular.forEach(frmMeds, function (frm) {
                    if (med.drugCode === frm.drugCode) {
                        if (prevAdded.indexOf(frm.drugCode) === -1) {
                            prevAdded.push(frm.drugCode);
                            frm.prevAdded = true;
                            if (checklist.indexOf(frm.drugCode) === -1) {
                                checklist.push(frm.drugCode);
                            }
                        }
                    }
                });
            });
        };

        mml.popToast = function (drugList) {
            var message = '';
            var successfulAddedMedFinish = '';
            var successfulAddedMedMultiBeginning  = '';
            var successfulAddedMedSingleBeginning  = '';

            $translate([
                'mml.successfulAddedMedFinish',
                'mml.successfulAddedMedMultiBeginning',
                'mml.successfulAddedMedSingleBeginning'])
            .then(function (translation) {
                successfulAddedMedFinish = translation['mml.successfulAddedMedFinish'];
                successfulAddedMedMultiBeginning =
                    translation['mml.successfulAddedMedMultiBeginning'];
                successfulAddedMedSingleBeginning =
                    translation['mml.successfulAddedMedSingleBeginning'];

                if (typeof drugList !== 'undefined' && drugList.length !== 0) {
                    if (drugList.length === 1) {
                        message = successfulAddedMedSingleBeginning + successfulAddedMedFinish;
                        toaster.pop('success', '', message, 3000);
                    } else {
                        message = drugList.length + successfulAddedMedMultiBeginning +
                            successfulAddedMedFinish;
                        toaster.pop('success', '', message, 3000);
                    }
                }
            });
        };

        mml.popSaveAssignedCategoryToast = function (checklist, categoryName) {
            if (checklist.length === 1) {
                var medication = MmlRest.getMedicationById(checklist[0]);

                $translate('mml.successfulAddedCatSingle', {
                    medicationName: medication.genericName,
                    categoryName: categoryName
                })
                .then(function (translation) {
                    toaster.pop('success', '', translation, 3000);
                });
            } else if (checklist.length > 1) {
                $translate('mml.successfulAddedCatMulti', {
                    medicationQty: checklist.length,
                    categoryName: categoryName
                })
                .then(function (translation) {
                    toaster.pop('success', '', translation, 3000);
                });
            }
        };

        mml.saveAssignedCategories = function () {
            var checklist = MmlRest.getMedications().checklist;
            if (mml.selectedCategory.id > 0 && mml.selectedCategory.name !== '') {
                var payload = {
                    category: {
                        id: mml.selectedCategory.id,
                        name: mml.selectedCategory.name
                    },
                    medIds: checklist
                };

                MmlRest.update('app/rest/medcategories', mml.selectedCategory.id, payload)
                    .then(function (res) {
                        if (res !== null) {
                            mml.popSaveAssignedCategoryToast(checklist, mml.selectedCategory.name);
                        }
                        mml.getMedications();
                        mml.cancelAssignedCategories();
                    });
            }
        };

        mml.setSelectedCategory = function (category) {
            var allMedications  = '';
            var search = '';
            var uncategorizedList = '';
            mml.selectedCategory.id = category.id;

            $translate([
                'mml.medicationCategories.allMedications',
                'mml.medicationCategories.search',
                'mml.medicationCategories.uncategorizedList'])
            .then(function (translation) {
                allMedications = translation['mml.medicationCategories.allMedications'];
                search = translation['mml.medicationCategories.search'];
                uncategorizedList = translation['mml.medicationCategories.uncategorizedList'];

                if (category.id > 0) {
                    mml.selectedCategory.name = category.name;
                    mml.selectedCategory.searchBarPlaceHolderText =  search + ' ' + category.name;
                } else if (category.id === 0) {
                    mml.selectedCategory.name = uncategorizedList;
                    mml.selectedCategory.searchBarPlaceHolderText =
                        search + ' ' + uncategorizedList;
                } else {
                    mml.selectedCategory.name = allMedications;
                    mml.selectedCategory.searchBarPlaceHolderText =
                        search + ' ' + allMedications;
                }
            });

            if (mml.assignCategoryMode.active) {
                mml.checkSelectedCategorizedMedications();
            }
        };

        mml.spliceList = function (main, remove) {
            var mainList = angular.copy(main);
            var removeList = angular.copy(remove);

            angular.forEach(removeList, function (removeItem) {
                if (mainList.indexOf(removeItem) > -1) {
                    mainList.splice(mainList.indexOf(removeItem), 1);
                }
            });

            return mainList;
        };

        mml.toggleCheckAll = function (frms, checked) {
            if (checked) {
                return frms.medications.map(function (item) {
                    return item.drugCode;
                });
            } else {
                return angular.copy(frms.prevAdded);
            }
        };

        return mml;
    });
