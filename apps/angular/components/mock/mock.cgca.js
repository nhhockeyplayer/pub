//'use strict';
/* jshint ignore:start */

angular.module('mock.cgca', [])
.service('CgcaServerDataModel', function ServerDataModel($http) {
    this.tree = [
        {
            id: 8888,
            name: 'Copy of Copy of ICU 4 WEST',
            careType: 'A'
        }, {
            id: 8863,
            name: 'Copy of ICU 4 WEST',
            careType: 'A'
        }, {
            id: 94,
            name: 'Demo Care Group 01',
            expanded: false,
            children: [{
                id: 249,
                name: 'Demo Care Area 123',
                careType: 'A'
            }],
            careType: 'G'
        }, {
            id: 600,
            name: 'Drug Record Care Group',
            expanded: true,
            children: [{
                id: 4679,
                name: 'Copy of Drug Record Care Area',
                careType: 'A'
            }, {
                id: 400,
                name: 'Drug Record Care Area',
                careType: 'A'
            }],
            careType: 'G'
        }
    ];

    this.careAreaDeviceDefaultsSyringe = {
        id: null,
        alerts: null,
        deviceType: 'Syringe',
        occlRestart: '3',
        allowOcclRstartChg: 'Y',
        req2ndWtBsaInp: 'N',
        wtHardHighLim: 600.0,
        wtSoftHighLim: null,
        wtSoftLowLim: null,
        wtHardLowLim: 0.2,
        bsaHardHighLim: 6.0,
        bsaSoftHighLim: null,
        bsaSoftLowLim: null,
        bsaHardLowLim: 0.05,
        rateHardHighLim: -1.0,
        rateSoftHighLim: -1.0,
        vtbiHardHighLim: 100.0,
        vtbiSoftHighLim: 100.0,
        allowAirLimChg: null,
        airIfuLim: null,
        allowKvoChange: 'N',
        kvoValue: null,
        allowDosChg: 'Y',
        occlSensitivity: 'Medium',
        allowSyrgNotInList: 'N',
        secondReview: 'None',
        reqCliId2ndRvw: 'N',
        reqOprIdent: 'Never',
        promptPatientIdent: 'N',
        allowSpkrVolChg: 'Y',
        speakerVolDefault: 9,
        autoScrBright: 'Y',
        scrBrightDflt: 5,
        autoLockUI: 'N',
        promptNoncomplaintMed: 'N',
        status: null,
        deactivationDt: null,
        createdBy: null,
        createdDt: null,
        updatedBy: null,
        updatedDt: null
    }

    this.careAreaDeviceDefaultsLVP = {
        id: null,
        alerts: null,
        deviceType: 'LVP',
        occlRestart: '3',
        allowOcclRstartChg: 'Y',
        req2ndWtBsaInp: 'N',
        wtHardHighLim: -1.0,
        wtSoftHighLim: null,
        wtSoftLowLim: null,
        wtHardLowLim: -1.0,
        bsaHardHighLim: -1.0,
        bsaSoftHighLim: null,
        bsaSoftLowLim: null,
        bsaHardLowLim: -1.0,
        rateHardHighLim: -1.0,
        rateSoftHighLim: -1.0,
        vtbiHardHighLim: 5000.0,
        vtbiSoftHighLim: 5000.0,
        allowAirLimChg: 'Y',
        airIfuLim: null,
        allowKvoChange: 'N',
        kvoValue: null,
        allowDosChg: 'Y',
        occlSensitivity: 'Medium',
        allowSyrgNotInList: null,
        secondReview: 'None',
        reqCliId2ndRvw: 'N',
        reqOprIdent: 'Never',
        promptPatientIdent: 'N',
        allowSpkrVolChg: 'Y',
        speakerVolDefault: 9,
        autoScrBright: 'Y',
        scrBrightDflt: 5,
        autoLockUI: 'N',
        promptNoncomplaintMed: 'N',
        status: null,
        deactivationDt: null,
        createdBy: null,
        createdDt: null,
        updatedBy: null,
        updatedDt: null
    }

    this.careItems = TAFFY([
        {
            id: 249,
            careAreaTypesId: 3,
            facilityId: '11',
            parentId: 94,
            name: 'Demo Care Area 123',
            status: 'A',
            createdBy: 'author',
            createdDt: 1395374400000,
            updatedBy: 'author',
            updatedDt: 1397534400000,
            sortOrder: 3,
            deactivationDt: null,
            careType: 'A',
            devices: [
                {
                    id: 64,
                    alerts: [],
                    deviceType: 'Syringe',
                    occlRestart: '5',
                    allowOcclRstartChg: 'Y',
                    req2ndWtBsaInp: 'N',
                    wtHardHighLim: 600,
                    wtSoftHighLim: 400,
                    wtSoftLowLim: 20,
                    wtHardLowLim: 0.4,
                    bsaHardHighLim: 3,
                    bsaSoftHighLim: 2,
                    bsaSoftLowLim: 0.5,
                    bsaHardLowLim: 0.05,
                    rateHardHighLim: 199,
                    rateSoftHighLim: 149,
                    vtbiHardHighLim: 99,
                    vtbiSoftHighLim: 81,
                    allowAirLimChg: null,
                    airIfuLim: null,
                    allowKvoChange: 'Y',
                    kvoValue: 0.32,
                    allowDosChg: 'N',
                    occlSensitivity: 'LessSensitive',
                    allowSyrgNotInList: 'N',
                    secondReview: 'High Risk Infusions',
                    reqCliId2ndRvw: 'N',
                    reqOprIdent: 'Never',
                    promptPatientIdent: 'N',
                    allowSpkrVolChg: 'N',
                    speakerVolDefault: 6,
                    autoScrBright: 'Y',
                    scrBrightDflt: 3,
                    autoLockUI: 'N',
                    promptNoncomplaintMed: 'N',
                    status: 'N',
                    deactivationDt: null,
                    createdBy: 'DERS',
                    createdDt: 1381982400000,
                    updatedBy: 'author',
                    updatedDt: 1397534400000
                }
            ],
            medCategories: [],
            isCareGroup: false,
            careAreaDeviceUniqueFields: null
        },
        {
            id: 94,
            careAreaTypesId: null,
            facilityId: '11',
            name: 'Demo Care Group 01',
            status: 'A',
            createdBy: 'author',
            createdDt: 1394424000000,
            updatedBy: 'author',
            updatedDt: 1397448000000,
            sortOrder: 2,
            deactivationDt: null,
            careType: 'G',
            devices: [
                {
                    id: 63,
                    alerts: [],
                    deviceType: 'LVP',
                    occlRestart: '5',
                    allowOcclRstartChg: 'Y',
                    req2ndWtBsaInp: 'N',
                    wtHardHighLim: 600,
                    wtSoftHighLim: 400,
                    wtSoftLowLim: 24,
                    wtHardLowLim: 0.2,
                    bsaHardHighLim: 3,
                    bsaSoftHighLim: 2,
                    bsaSoftLowLim: 0.1,
                    bsaHardLowLim: 0.02,
                    rateHardHighLim: 1400,
                    rateSoftHighLim: 1451,
                    vtbiHardHighLim: 1000,
                    vtbiSoftHighLim: 800,
                    allowAirLimChg: 'N',
                    airIfuLim: 50,
                    allowKvoChange: 'Y',
                    kvoValue: 0.5,
                    allowDosChg: 'N',
                    occlSensitivity: 'MostSensitive',
                    allowSyrgNotInList: null,
                    secondReview: 'All Infusions',
                    reqCliId2ndRvw: 'Y',
                    reqOprIdent: 'ProgramORModify',
                    promptPatientIdent: 'Y',
                    allowSpkrVolChg: 'N',
                    speakerVolDefault: 4,
                    autoScrBright: 'N',
                    scrBrightDflt: 5,
                    autoLockUI: 'N',
                    promptNoncomplaintMed: 'Y',
                    status: 'N',
                    deactivationDt: null,
                    createdBy: 'DERS',
                    createdDt: 1381982400000,
                    updatedBy: 'author',
                    updatedDt: 1397534400000
                },
                {
                    id: 62,
                    alerts: [],
                    deviceType: 'Syringe',
                    occlRestart: '2',
                    allowOcclRstartChg: 'Y',
                    req2ndWtBsaInp: 'N',
                    wtHardHighLim: 600,
                    wtSoftHighLim: 460,
                    wtSoftLowLim: 25,
                    wtHardLowLim: 0.5,
                    bsaHardHighLim: 3,
                    bsaSoftHighLim: 2,
                    bsaSoftLowLim: 0.5,
                    bsaHardLowLim: 0.05,
                    rateHardHighLim: 200,
                    rateSoftHighLim: 150,
                    vtbiHardHighLim: 100,
                    vtbiSoftHighLim: 80,
                    allowAirLimChg: null,
                    airIfuLim: null,
                    allowKvoChange: 'Y',
                    kvoValue: 0.31,
                    allowDosChg: 'Y',
                    occlSensitivity: 'MostSensitive',
                    allowSyrgNotInList: 'Y',
                    secondReview: 'None',
                    reqCliId2ndRvw: 'N',
                    reqOprIdent: 'Never',
                    promptPatientIdent: 'N',
                    allowSpkrVolChg: 'Y',
                    speakerVolDefault: 9,
                    autoScrBright: 'Y',
                    scrBrightDflt: 5,
                    autoLockUI: 'N',
                    promptNoncomplaintMed: 'N',
                    status: 'N',
                    deactivationDt: null,
                    createdBy: 'DERS',
                    createdDt: 1381982400000,
                    updatedBy: 'author',
                    updatedDt: 1396238400000
                }
            ],
            medCategories: [],
            isCareGroup: true,
            careAreaDeviceUniqueFields: {
                LVP: [
                    'occlRestart',
                    'allowOcclRstartChg',
                    'autoLockUI',
                    'autoScrBright',
                    'allowDosChg',
                    'req2ndWtBsaInp',
                    'wtHardHighLim',
                    'wtSoftLowLim',
                    'wtHardLowLim',
                    'bsaHardHighLim',
                    'bsaSoftHighLim',
                    'bsaSoftLowLim',
                    'bsaHardLowLim',
                    'rateHardHighLim',
                    'rateSoftHighLim',
                    'vtbiHardHighLim',
                    'vtbiSoftHighLim',
                    'allowKvoChange',
                    'occlSensitivity',
                    'allowSpkrVolChg',
                    'speakerVolDefault',
                    'scrBrightDflt',
                    'promptNoncomplaintMed',
                    'airIfuLim',
                    'kvoValue',
                    'secondReview',
                    'reqCliId2ndRvw',
                    'reqOprIdent',
                    'allowAirLimChg',
                    'promptPatientIdent',
                    'autoLockUI',
                    'autoScrBright',
                    'allowDosChg',
                    'req2ndWtBsaInp',
                    'wtHardHighLim',
                    'wtSoftLowLim',
                    'wtHardLowLim',
                    'bsaHardHighLim',
                    'bsaSoftHighLim',
                    'bsaSoftLowLim',
                    'bsaHardLowLim',
                    'rateHardHighLim',
                    'rateSoftHighLim',
                    'vtbiHardHighLim',
                    'vtbiSoftHighLim',
                    'allowKvoChange',
                    'occlSensitivity',
                    'allowSpkrVolChg',
                    'speakerVolDefault',
                    'scrBrightDflt',
                    'promptNoncomplaintMed',
                    'airIfuLim',
                    'kvoValue',
                    'secondReview',
                    'reqCliId2ndRvw',
                    'reqOprIdent',
                    'allowAirLimChg',
                    'promptPatientIdent'
                ],
                Syringe: []
            }
        }
    ]);

//    $http.get('resources/components/cgca/tree.mock.json').success(function (data) {
//        this.tree = data;
//    });
//
//    $http.get('resources/components/cgca/cg.mock.json').success(function (data) {
//        this.careItems.push(data.responseData);
//    });
//
//    $http.get('resources/components/cgca/ica.mock.json').success(function (data) {
//        this.careItems.push(data.responseData);
//    });
//
//    $http.get('resources/components/cgca/ica.mock.json').success(function (data) {
//        this.careItems.push(data.responseData);
//    });

    this.wrapResponse = function (data) {
        if (data) {
            var s = {
                success: true,
                responseData: data
            }
            console.log(s);
            return s;
        } else {
            return {
                success: false,
                responseData: null
            }
        }
    }

    this.getTree = function () {
        console.log('Mocking cgca tree response with angular.');
        return this.wrapResponse(this.tree);
    };

    this.getLvpDeviceDefaults = function () {
        console.log('cgca mock: returning lvp device defaults mock');
        return this.wrapResponse(this.careAreaDeviceDefaultsLVP);
    }

    this.getSyringeDeviceDefaults = function () {
        return this.wrapResponse(this.careAreaDeviceDefaultsSyringe);
    }

    this.getLvpDeviceDefaults = function () {
//        return this.wrapResponse({
//            lvp: this.careAreaDeviceDefaultsLVP,
//            syringe: this.careAreaDeviceDefaultsSyringe
//        })
    };

    this.getCareItem = function (method, url, data, headers) {
//        var regexp = /^app\/rest\/care_item\/([0-9]+)/;
//        var id = url.match(regexp)[1];
//        console.log('cgca mock: matched careItem #' + id);
        // find the item that matches that id using tafe
        var careItem = this.careItems({id: 94}).first();
        // even if list contains multiple items, just return first one
        console.log('cgca mock: returning care item mock');
        return this.wrapResponse(careItem);
    };

//    // options parameter is an object with key value pairs
//    // in this simple implementation, value is limited to a single value (no arrays)
//    this.findMany = function(options) {
//        // find games that match all of the options
//        var list = $.grep(this.getData(), function(element, index) {
//            var matchAll = true;
//            $.each(options, function(optionKey, optionValue) {
//                if(element[optionKey] != optionValue) {
//                    matchAll = false;
//                    return false;
//                }
//            });
//            return matchAll;
//        });
//    };
//
//    // add a new data item that does not exist already
//    // must compute a new unique id and backfill in
//    this.addOne = function(dataItem) {
//        // must calculate a unique ID to add the new data
//        var newId = this.newId();
//        dataItem.gameid = newId;
//        this.data.push(dataItem);
//        return dataItem;
//    };
//
//    // return an id to insert a new data item at
//    this.newId = function() {
//        // find all current ids
//        var currentIds = $.map(this.getData(), function(dataItem) { return dataItem.gameid; });
//        // since id is numeric, and we will treat like an autoincrement field, find max
//        var maxId = Math.max.apply(Math, currentIds);
//        // increment by one
//        return maxId + 1;
//    };
//
//    this.updateOne = function(gameid, dataItem) {
//        // find the game that matches that id
//        var games = this.getData();
//        var match = null;
//        for (var i=0; i < games.length; i++) {
//            if(games[i].gameid == gameid) {
//                match = games[i];
//                break;
//            }
//        }
//        if(!angular.isObject(match)) {
//            return {};
//        }
//        angular.extend(match, dataItem);
//        return match;
//    };
//
//    this.deleteOne = function(gameid) {
//        // find the game that matches that id
//        var games = this.getData();
//        var match = false;
//        for (var i=0; i < games.length; i++) {
//            if(games[i].gameid == gameid) {
//                match = true;
//                games.splice(i, 1);
//                break;
//            }
//        }
//        return match;
//    };
});

/* jshint ignore:end */
