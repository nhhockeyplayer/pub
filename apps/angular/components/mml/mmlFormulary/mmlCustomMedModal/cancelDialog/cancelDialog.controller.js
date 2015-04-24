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
 * Contains MML Custom Medication Modal Cancel Controller application
 */

'use strict';

angular.module('mmlCustomMedModal.cancel.module')
    .controller('CancelDialogController', function ($modalInstance) {
        var _this = this;
        _this.yes = function () {
            $modalInstance.close('yes');
        };
        _this.no = function () {
            $modalInstance.dismiss('cancel');
        };
    });
