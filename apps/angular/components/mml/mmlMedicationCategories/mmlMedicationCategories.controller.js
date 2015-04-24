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
 * Contains mml Medication Categories Controller application
 */
'use strict';

angular.module('mmlMedicationCategories.module')
    .controller('MmlMedicationCategoriesController', function (MmlRest, MmlSvc) {
        var _this = this;

        _this.medicationCategories = MmlRest.getMedicationCategories();
        _this.newmedicationCategories = {category: {name: ''}, medIds: []};
        _this.selectedCategory = MmlSvc.selectedCategory;
        _this.categoryBeingEdited = 0;

        _this.isLoading = function (target) {
            return MmlSvc.isLoading(target);
        };

        _this.clearInput = function () {
            if (_this.mouseLeave === true) {
                _this.newmedicationCategories.category.name = '';
            }
        };

        _this.addmedicationCategories = function () {
            if (_this.newmedicationCategories.category.name.length > 0) {
                MmlRest.post('app/rest/medcategories', _this.newmedicationCategories)
                    .then(function () {
                        _this.newmedicationCategories.category.name = '';
                        MmlSvc.getMedicationCategories();
                    });
            }
        };

        _this.setSelectedCategory = function (category) {
            MmlSvc.setSelectedCategory(category);
        };

        _this.editCategory = function (category) {
            _this.categoryBeingEdited = category.id;
        };
    });
