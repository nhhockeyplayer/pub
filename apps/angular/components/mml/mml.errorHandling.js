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
 * Contains MML ErrorHandling Service application
 */

'use strict';

angular.module('mml.module')
    .factory('ErrorHandlerSvc', function () {
        var _this = this;
        _this.alertList = [];

        //Adds an error Message to the list
        var addError = function (error) {
            var alert = decodeError(error);
            _this.alertList.push(alert);
        };

        // Removes the alert
        var closeAlert = function (index) {
            _this.alertList.splice(index, 1);
        };

        var decodeError = function (error) {
            var alert = {
                type: 'info',
                msg: 'While processing an error, an error was encountered.'
            };

            if (error && error.hasOwnProperty('status') && error.hasOwnProperty('statusText')) {
                if (error.status === 0) {
                    alert.type = 'danger';
                    alert.msg = 'Cannot connect to server';
                } else if (error.status >= 400 && error.status < 500) {
                    alert.type = 'danger';
                    alert.msg = error.statusText;
                } else {
                    alert.type = 'warning';
                    alert.msg = error.statusText;
                }
            }

            return alert;
        };

        // Returns the alert List
        var getAlertList = function () {
            return _this.alertList;
        };

        return {
            addError: addError,
            closeAlert: closeAlert,
            decodeError: decodeError,
            getAlertList: getAlertList
        };
    });
