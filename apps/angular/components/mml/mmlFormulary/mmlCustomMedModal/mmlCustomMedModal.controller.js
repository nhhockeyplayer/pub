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
 * Contains MML Custom Medication Modal Controller application
 */

'use strict';

angular.module('mmlCustomMedModal.module')
    .controller('MmlCustomMedModalController', function (
            $modal,
            $modalInstance,
            MmlRest,
            MmlSvc) {
        var _this = this;

        _this.customMedOpts = {updateOn:  'blur'};

        _this.customMed = {
            highAlert: 'N',
            cqiCompliant: 'Y',
            active: 'Y'
        };

        _this.closeCustomMedModal = function (field) {
            if (field.$pristine) {
                $modalInstance.dismiss('cancel');
            } else {
                _this.openModal();
            }
        };

        _this.openModal = function () {
            _this.modalInstance = $modal.open({
                templateUrl:
                    'resources/components/mml/mmlFormulary/mmlCustomMedModal/' +
                    'cancelDialog/cancelDialog.tmpl.html',
                controller: 'CancelDialogController as Dialog',
                backdrop: 'static',
                windowClass: 'custom-medication cancel-modal col-xs-offset-3',
                keyboard: false
            });

            _this.modalInstance.result.then(function (result) {
                if (result === 'yes') {
                    $modalInstance.dismiss('cancel');
                }
            });
        };

        //Change to post not MockPost when using real data
        _this.saveCustomMed = function () {
            _this.customMed.cqiCompliant = (_this.customMed.highAlert === 'Y') ? 'N' : 'Y';

            MmlRest.post('app/rest/medications', _this.customMed)
                .then(function () {
                    MmlSvc.getMedications();
                    $modalInstance.dismiss('cancel');
                });
        };

        _this.toValidate = function (field) {
            return (field.$touched && field.$invalid) ? 'has-error' :  '';
        };
    });
