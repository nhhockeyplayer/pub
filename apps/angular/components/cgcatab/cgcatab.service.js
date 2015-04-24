'use strict';

angular.module('cgcatab.service', [])
    .factory('CgcatabService', function (RestService, ModalService, $q, $translate, $rootScope) {
        var factory = {
            share: {}
        };
        factory.treeCache = null;
        factory.careItemCache = [];
        factory.share.activeCareItem = null;
        factory.share.activeItemModeSaved = null;
        factory.deviceDefaultsCache = [];
        factory.careCatWTypesCache = [];
        factory.medicationCategoryCache = [];
        factory.facilitiesCache = null;
        factory.asEmptyCareItem = {
                name: null,
                careCategoryId: null,
                id: null,
                careAreaDeviceUniqueFields: null,
                careAreaTypeId: null,
                careAreaPasscode: null,
                allowSupressInactivityTimers: null,
                facilityId: null,
                careType: null,
                devices: {},
                medCategories: [],
                status: null,
                updatedBy: null,
                updatedDt: null,
                createdBy: null,
                createdDt: null,
                parentId: null,
                children: [],
                leaf: false,
                isCareGroup: false,
                cls: null,
                deactivationDt: null,
                sortOrder: null
              };
        factory.options = {
            occlSensitivity: [
              {
                  id: 'MostSensitive',
                  name: 'global.formoption.mostSensitive'
              },
              {
                  id: 'MoreSensitive',
                  name: 'global.formoption.moreSensitive'
              },
              {
                  id: 'Medium',
                  name: 'global.formoption.medium'
              },
              {
                  id: 'LessSensitive',
                  name: 'global.formoption.lessSensitive'
              },
              {
                  id: 'LeastSensitive',
                  name: 'global.formoption.leastSensitive'
              }
            ],
            airIfuLim: [
                {id: '25'},
                {id: '50'},
                {id: '75'},
                {id: '100'},
                {id: '125'},
                {id: '150'}
            ]
        };

        $rootScope.$on('event:auth-loginConfirmed', factory.reset);

        factory.reset = function () {
            factory.treeCache = null;
            factory.careItemCache = [];
            factory.share.activeCareItem = null;
            factory.share.activeItemModeSaved = null;
            factory.deviceDefaultsCache = [];
            factory.careCatWTypesCache = [];
            factory.medicationCategoryCache = [];
            factory.facilitiesCache = null;
        };

        // call this for a new care group
        factory.createCareGroup = function () {
            var deferred = $q.defer();
            factory.share.activeCareItem = angular.copy(factory.asEmptyCareItem);
            factory.share.activeCareItem.careType = 'G';
            factory.share.activeItemModeSaved = false;
            deferred.resolve();
            return deferred.promise;
        };

        // call this for a new care area
        factory.createCareArea = function () {
            var deferred = $q.defer();
            factory.share.activeCareItem = angular.copy(factory.asEmptyCareItem);
            factory.share.activeCareItem.careType = 'A';
            factory.share.activeItemModeSaved = false;
            deferred.resolve();
            return deferred.promise;
        };

        // call this for a new care area
        factory.createIndependentCareArea = function () {
            var deferred = $q.defer();
            factory.share.activeCareItem = angular.copy(factory.asEmptyCareItem);
            factory.share.activeCareItem.careType = 'A';
            factory.share.activeItemModeSaved = false;
            deferred.resolve();
            return deferred.promise;
        };

        factory.getDeviceOptions = function () {
            var deferred = $q.defer();
            deferred.resolve(factory.options);
            return deferred.promise;
        };

        factory.getCareItem = function (careItemId) {
            var deferred = $q.defer();
            var cache = false;
            // provide a care item from our cache if possible. otherwise get from server and cache.
            if (!factory.careItemCache[careItemId] || cache === false) {
                RestService.get('app/rest/care_items/' + careItemId)
                .then(function (data) {
                    if (data.success) {
                        var asCareItem = factory.assimilateCareItem(data.responseData);
                        factory.careItemCache[asCareItem.id] = asCareItem;
                        factory.share.activeCareItem = angular.copy(asCareItem);
                        deferred.resolve();
                    } else {
                        deferred.reject();
                    }
                });
            } else {
                deferred.resolve(angular.copy(factory.careItemCache[careItemId]));
            }
            // return a promise resolving to a deep copy of the care item.
            return deferred.promise;
        };

        factory.updateCareItem = function (careItem) {
            var deferred = $q.defer();
            // we need to tweak the care item so the server understands it.
            // if we dont copy the item fields will dissapear on scope
            var disCareItem = factory.disassimilateCareItem(angular.copy(careItem));
            RestService.update('app/rest/care_items', disCareItem.id, disCareItem)
                .then(function (data) {
                    if (data.success) {
                        var asCareItem = factory.assimilateCareItem(data.responseData);
                        factory.careItemCache[asCareItem.id] = asCareItem;
                        factory.share.activeCareItem.id = asCareItem.id;
                        factory.share.activeCareItem.createdDt = asCareItem.createdDt;
                        factory.share.activeCareItem.createdBy = asCareItem.createdBy;
                        data.responseData = asCareItem;
                        factory.share.activeItemModeSaved = true;
                        deferred.resolve(data);
                    } else {
                        // place errors on form field
                        deferred.resolve(data);
                    }
                    return data;
                });
            return deferred.promise;
        };

        factory.addCareItem = function (careItem) {
            var deferred = $q.defer();
            // we need to tweak the care item so the server understands it.
            // if we dont copy the item fields will dissapear on scope
            var disCareItem = factory.disassimilateCareItem(angular.copy(careItem));
            RestService.add('app/rest/care_items', disCareItem)
                .then(function (data) {
                    if (data.success) {
                        var asCareItem = factory.assimilateCareItem(data.responseData);
                        // place it on scope (just in case we choose to edit again) and in the cache
                        factory.careItemCache[asCareItem.id] = asCareItem;
                        // currently we do not entirely swap the data because the ui looses refernce
                        factory.share.activeCareItem.id = asCareItem.id;
                        factory.share.activeCareItem.createdDt = asCareItem.createdDt;
                        factory.share.activeCareItem.createdBy = asCareItem.createdBy;
                        factory.share.activeItemModeSaved = true;
                        data.responseData = asCareItem;
                        deferred.resolve(data);
                    } else {
                        // place errors on form field
                        deferred.resolve(data);
                    }
                    return data;
                });
            return deferred.promise;
        };

        factory.deleteCareItem = function (careItemId) {
            var promise = RestService._delete('app/rest/care_items', careItemId);
            promise.then(function (data) {
                    if (data.success) {
                        delete factory.careItemCache[careItemId];
                        if (factory.share.activeCareItem.hasOwnProperty('id')) {
                            if (factory.share.activeCareItem.id === careItemId) {
                                factory.share.activeCareItem = null;
                            }
                        }
                    }
                });
            return promise;
        };

        // DEVICE

        factory.createDevice = function (deviceType) {
            var deferred = $q.defer();
            if (!factory.deviceDefaultsCache[deviceType]) {
                RestService.get('app/rest/default_care_area_device/' + deviceType)
                .then(function (data) {
                    if (data.success) {
                        var asDevice = factory.assimilateDevice(data.responseData);
                        factory.deviceDefaultsCache[asDevice.deviceType] = asDevice;
                        deferred.resolve(angular.copy(factory.deviceDefaultsCache[deviceType]));
                    } else {
                        deferred.reject();
                    }
                });
            } else {
                deferred.resolve(angular.copy(factory.deviceDefaultsCache[deviceType]));
            }
            return deferred.promise;
        };

        // read, edit, and delete depend on  will be handled by the view.

        // TREE

        factory.getTree = function () {
            var deferred = $q.defer();
            if (!factory.treeCache) {
                RestService.get('app/rest/care_items')
                .then(function (data) {
                    if (data.success) {
                        factory.treeCache = data.responseData;
                        deferred.resolve(angular.copy(factory.treeCache));
                    } else {
                        deferred.reject();
                    }
                });
            } else {
                deferred.resolve(angular.copy(factory.treeCache));
            }
            return deferred.promise;
        };

        // HELPER METHODS

        // method to convert the careItem and any devices usable by the server.
        factory.assimilateCareItem = function (careItem) {
            var i;
            for (i = 0; i < careItem.devices.length; i++) {
                careItem.devices[i] = factory.assimilateDevice(careItem.devices[i]);
            }
            // enable existing devices. map devices instead of array.
            var devices = {};
            var deviceType = null;
            for (i = 0; careItem.devices.length < i; i++) {
                deviceType = careItem.devices[i].deviceType;
                devices[deviceType] = careItem.devices[i];
            }
            careItem.devices = devices;
            return careItem;
        };

        // method to convert the careItem and any devices usable by forms.
        factory.disassimilateCareItem = function (careItem) {
            var devices = [];
            for (var key in careItem.devices) {
                if (careItem.devices.hasOwnProperty(key)) {
                    factory.disassimilateDevice(careItem.devices[key]);
                    devices.push(careItem.devices[key]);
                }
            }
            careItem.devices = devices;
            return careItem;
        };

        // method to convert the careItem and any devices usable by the server.
        factory.assimilateDevice = function (device) {
            if (device.alerts === null) {
                device.alerts = [];
            }
            device.wt = {
                hardHigh: device.wtHardHighLim,
                softHigh: device.wtSoftHighLim,
                softLow: device.wtSoftLowLim,
                hardLow: device.wtHardLowLim
            };
            delete device.wtHardHighLim;
            delete device.wtSoftHighLim;
            delete device.wtSoftLowLim;
            delete device.wtHardLowLim;
            device.bsa = {
                    hardHigh: device.bsaHardHighLim,
                    softHigh: device.bsaSoftHighLim,
                    softLow: device.bsaSoftLowLim,
                    hardLow: device.bsaHardLowLim
            };
            delete device.bsaHardHighLim;
            delete device.bsaSoftHighLim;
            delete device.bsaSoftLowLim;
            delete device.bsaHardLowLim;
            device.vtbi = {
                hardHigh: device.vtbiHardHighLim,
                softHigh: device.vtbiSoftHighLim
            };
            delete device.vtbiHardHighLim;
            delete device.vtbiSoftHighLim;
            device.rate = {
                hardHigh: device.rateHardHighLim,
                softHigh: device.rateSoftHighLim
            };
            delete device.rateHardHighLim;
            delete device.rateSoftHighLim;

            return device;
        };

        // method to convert the careItem and any devices usable by forms.
        factory.disassimilateDevice = function (device) {
            device.wtHardHighLim = device.wt.hardHigh;
            device.wtSoftHighLim = device.wt.softHigh;
            device.wtSoftLowLim = device.wt.softLow;
            device.wtHardLowLim = device.wt.hardLow;
            device.bsaHardHighLim = device.bsa.hardHigh;
            device.bsaSoftHighLim = device.bsa.softHigh;
            device.bsaSoftLowLim = device.bsa.softLow;
            device.bsaHardLowLim = device.bsa.hardLow;
            device.vtbiHardHighLim = device.vtbi.hardHigh;
            device.vtbiSoftHighLim = device.vtbi.softHigh;
            device.rateHardHighLim = device.rate.hardHigh;
            device.rateSoftHighLim = device.rate.softHigh;
            return device;
        };

        factory.getCareCategories = function () {
            var deferred = $q.defer();
            if (factory.careCatWTypesCache.length === 0) {
                RestService.get('app/rest/care_categories')
                .then(function (data) {
                    if (data.success) {
                        var id;
                        for (var i = 0; i < data.responseData.length; i++) {
                            id = data.responseData[i].traceUUID;
                            factory.careCatWTypesCache[id] = data.responseData[i];
                        }
                        deferred.resolve(data.responseData);
                    } else {
                        deferred.reject();
                    }
                });
            } else {
                deferred.resolve(factory.careCatWTypesCache);
            }
            return deferred.promise;
        };

        factory.getCareAreaTypes = function (careCatId) {
            var deferred = $q.defer();
            if (!factory.careCatWTypesCache[careCatId]) {
                factory.careCatWTypesCache[careCatId] = {};
                RestService.get('app/rest/care_categories/' + careCatId + '/care_area_types')
                .then(function (data) {
                    if (data.success) {
                        factory.careCatWTypesCache[careCatId].careAreaTypes = data.responseData;
                        deferred.resolve(angular.copy(data.responseData));
                    } else {
                        deferred.reject();
                    }
                });
            } else {
                deferred.resolve(
                   angular.copy(factory.careCatWTypesCache[careCatId].careAreaTypes));
            }
            return deferred.promise;
        };

        factory.getMedicationCategories = function () {
            var deferred = $q.defer();
            if (factory.medicationCategoryCache.length === 0) {
                RestService.get('app/rest/medcategories')
                .then(function (data) {
                    if (data.success) {
                        factory.medicationCategoryCache = data.responseData;
                        deferred.resolve(angular.copy(factory.medicationCategoryCache));
                    } else {
                        deferred.reject();
                    }
                });
            } else {
                deferred.resolve(angular.copy(factory.medicationCategoryCache));
            }
            return deferred.promise;
        };

        // factory.getFacilities = function () {
        //     var deferred = $q.defer();
        //     if (factory.facilitiesCache.length == 0) {
        //         RestService.get('app/rest/') // unsure what the false flag does.
        //         .then(function (data) {
        //             if (data.success) {
        //                 factory.facilitiesCache = data.responseData;
        //                 deferred.resolve(angular.copy(factory.facilitiesCache));
        //             } else {
        //                 deferred.reject();
        //             }
        //         });
        //     } else {
        //         deferred.resolve(angular.copy(factory.facilitiesCache));
        //     }
        //     return deferred.promise;
        // };

        // factory.getCareAreas = function (facilityId) {
        //     var deferred = $q.defer();
        //     if (!factory.careCatWTypesCache[careCatId]) {
        //         factory.careCatWTypesCache[careCatId] = {};
        //         RestService.get('app/rest/care_categories/' + careCatId + '/care_area_types')
        //         .then(function (data) {
        //             if (data.success) {
        //                 factory.careCatWTypesCache[careCatId].careAreaTypes = data.responseData;
        //                 deferred.resolve(angular.copy(data.responseData));
        //             } else {
        //                 deferred.reject();
        //             }
        //         });
        //     } else {
        //         deferred.resolve(
        //            angular.copy(factory.careCatWTypesCache[careCatId].careAreaTypes));
        //     }
        //     return deferred.promise;
        // };

        factory.getOcclSensitivity = function () {
            var deferred = $q.defer();
            deferred.resolve(factory.options.occlSensitivity);
            return deferred.promise;
        };

        factory.getAirIfuLim = function () {
            var deferred = $q.defer();
            deferred.resolve(factory.options.airIfuLim);
            return deferred.promise;
        };

        return factory;
    });
