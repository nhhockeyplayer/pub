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
 * Contains MML Formulary Controller application
 */
'use strict';

angular.module('mmlFormulary.module')
    .controller('MmlFormularyController', function ($modal, MmlRest, MmlSvc) {
        var _this = this;

        _this.formulary = MmlRest.getFormulary();

        _this.addSelected = function () {
            var codes = MmlSvc.spliceList(
                MmlRest.getFormulary().checklist, MmlRest.getFormulary().prevAdded);
            var altNames = _this.formulary.includeAliases;
            var payload = {drugCodes: codes, includeAltNames: altNames};

            MmlRest.post('app/rest/medications_batch', payload)
                .then(function () {
                    MmlSvc.getMedications();
                    MmlSvc.popToast(payload.drugCodes);
                });
        };

        _this.isLoading = function (target) {
            return MmlSvc.isLoading(target);
        };

        _this.highlightSelFrm = function (formulary) {
            var drugList = MmlSvc.spliceList(MmlRest.getFormulary().checklist,
                MmlRest.getFormulary().prevAdded);
            return drugList.indexOf(formulary.drugCode) > -1;
        };

        _this.openCustomMedicationModal = function () {
            $modal.open({
                templateUrl:
                    'resources/components/mml/mmlFormulary/' +
                    'mmlCustomMedModal/mmlCustomMedModal.tmpl.html',
                controller: 'MmlCustomMedModalController as CustMed',
                backdrop: 'static',
                windowClass: 'custom-medication col-xs-offset-3',
                keyboard: false
            });
        };

        _this.toggleCheckAll = function () {
            _this.formulary.checklist = MmlSvc.toggleCheckAll(
                MmlRest.getFormulary(),
                _this.selectAllFrms);
        };
    });
