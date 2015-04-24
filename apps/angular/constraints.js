'use strict';

angular.module('hsm-dalmgr.constraints', ['valdr'])
.config(function (valdrProvider) {
    valdrProvider.addConstraints({
        medication: {
            genericName: {
                size: {
                    min: 2,
                    max: 10,
                    message: 'Generic name must be between 2 and 10 characters.'
                },
                required: {
                    message: 'Generic name is required.'
                }
            },
            pumpName: {
                size: {
                    min: 2,
                    max: 20,
                    message: 'Pump name must be between 2 and 20 characters.'
                }
            }
        }
    });
});
