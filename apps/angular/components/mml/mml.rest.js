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
 * Contains MML Rest application
 *
 */
'use strict';

angular.module('mml.module')
    .factory('MmlRest', function (RestService, ErrorHandlerSvc) {
        var formulary = {
            checklist: [],
            prevAdded: [],
            medications: [],
            includeAliases: false
        };

        var medications = {
            checklist: [],
            medications: []
        };

        var medicationCategories = {
            categories: []
        };

        var MmlRest = {};

        /*  GETs the formulary data by RestService, parses it, and assigns it.
            The response can be manually assigned if needed. */
        MmlRest.fetchFormulary = function () {
            return RestService.get('app/rest/formulary/' + formulary.includeAliases)
                .then(function (response) {
                    if (response.success) {
                        formulary.medications = response.responseData;
                        return response.responseData;
                    } else {
                        ErrorHandlerSvc.addError(response.errors);
                        formulary.medications = null;
                        return null;
                    }
                })
                .catch(function (error) {
                    ErrorHandlerSvc.addError(error);
                    formulary.medications = null;
                    return null;
                });
        };

        /*  GETs the medications data by RestService, parses it, and assigns it.
            The response can be manually assigned if needed. */
        MmlRest.fetchMedications = function () {
            return RestService.get('app/rest/medications')
                .then(function (response) {
                    if (response.success) {
                        medications.medications = response.responseData;
                        return response.responseData;
                    } else {
                        ErrorHandlerSvc.addError(response.errors);
                        medications.medications = null;
                        return null;
                    }
                })
                .catch(function (error) {
                    ErrorHandlerSvc.addError(error);
                    medications.medications = null;
                    return null;
                });
        };

        /*  GETs the medication category data by RestService, parses it, and assigns it.
            The response can be manually assigned if needed. */
        MmlRest.fetchMedicationCategories = function () {
            return RestService.get('app/rest/medcategories')
                .then(function (response) {
                    if (response.success) {
                        medicationCategories.categories = response.responseData;
                        return response.responseData;
                    } else {
                        ErrorHandlerSvc.addError(response.errors);
                        medicationCategories.categories = null;
                        return null;
                    }
                })
                .catch(function (error) {
                    ErrorHandlerSvc.addError(error);
                    medicationCategories.categories = null;
                    return null;
                });
        };

        MmlRest.post = function (endpoint, payload) {
            return RestService.add(endpoint, payload)
                .then(function (response) {
                    if (response.success) {
                        return response.responseData;
                    } else {
                        ErrorHandlerSvc.addError(response.errors);
                        return null;
                    }
                })
                .catch(function (error) {
                    ErrorHandlerSvc.addError(error);
                    return null;
                });
        };

        MmlRest.update = function (endpoint, id, payload) {
            return RestService.update(endpoint, id, payload)
                .then(function (response) {
                    if (response.success) {
                        return response.responseData;
                    } else {
                        ErrorHandlerSvc.addError(response.errors);
                        return null;
                    }
                })
                .catch(function (error) {
                    ErrorHandlerSvc.addError(error);
                    return null;
                });
        };

        MmlRest.getFormulary = function () {
            return formulary;
        };

        MmlRest.getMedications = function () {
            return medications;
        };

        MmlRest.getMedicationCategories = function () {
            return medicationCategories;
        };

        MmlRest.setMedications = function (data) {
            medications = data;
        };

        MmlRest.getMedicationById = function (id) {
            var medication = {};
            angular.forEach(medications.medications, function (med) {
                if (med.id === id) {
                    medication = med;
                }
            });
            return medication;
        };

        return MmlRest;
    });
