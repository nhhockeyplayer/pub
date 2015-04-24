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
 * Mock Rest Responses
 *
 * Question: "I want to create a mock what do I need to do?"
 * * Turn on the mocking module in hsm-dalmgr.module.js by uncommenting the hsm-dalmgr.mocks module.
 *     * This will enable mocking in the application.
 * * In hsm-dalmgr.mocks.js, create a $httpBackend.whenGet(URL).
 * * Chain a .respond(DATA).
 *     * The respond accepts a JSON Object you wish the url to respond to.
 *     * The .respond() must come before any .passthrough().
 *     * If you do not wish to mock a specfic URL, then give use a .passthough().
 *         * .passthrough() will simply detect the url and return the server data.
 * * Be sure to create a $httpBackend for all URLs otherwise you will receive an "Unexpected GET".
*/

'use strict';

angular.module('hsm-dalmgr.mocks', ['mock.module'])
    .config(function ($provide) {
        $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
    })
    .run(function ($httpBackend, $http, CgcaServerDataModel, MmlServerDataModel) {
        // $httpBackend.whenGET('app/rest/care_item/')
        //  .respond(CgcaServerDataModel.getCareItem());
        $httpBackend.whenGET('app/rest/care_items')
            .respond(CgcaServerDataModel.getTree());
        $httpBackend.whenGET('app/rest/default_care_area_device/lvp')
            .respond(CgcaServerDataModel.getLvpDeviceDefaults());
        $httpBackend.whenGET('app/rest/default_care_area_device/syringe')
            .respond(CgcaServerDataModel.getSyringeDeviceDefaults());
        $httpBackend.whenGET('app/rest/medcategories')
            .respond(MmlServerDataModel.getMedCategories());
        $httpBackend.whenGET('app/rest/medications')
            .respond(MmlServerDataModel.getMedications());
        $httpBackend.whenGET(/^app\/rest\/care_item\/(.*)/)
            .respond(CgcaServerDataModel.getCareItem());
        $httpBackend.whenGET(/^app\/rest\/formulary\/(.*)/)
            .respond(MmlServerDataModel.getFormulary());
        $httpBackend.whenPOST('app/rest/medcategories')
            .respond({success: true, responseData: [4]});
        $httpBackend.whenPOST('app/rest/medications')
            .respond({success: true});
        $httpBackend.whenPOST('app/rest/medications_batch')
            .respond({success: true});
        $httpBackend.whenPUT(/^app\/rest\/medcategories\/[0-9]+/)
            .respond({success: true, responseData: [4]});
        // this must come last
        // pass through resource requests.  these are handled by Gradle server.
        // pass through to allow loading of data from json resource mocks.
        $httpBackend.whenGET('api-docs').passThrough();
        $httpBackend.whenGET('app/logout').passThrough();
        $httpBackend.whenGET('app/rest/account').passThrough();
        $httpBackend.whenGET('app/rest/formulary').passThrough();
        $httpBackend.whenGET('app/rest/formulary/false').passThrough();
        $httpBackend.whenGET('app/rest/logs').passThrough();
        $httpBackend.whenGET('app/rest/medcategories').passThrough();
        $httpBackend.whenGET('app/rest/medications').passThrough();
        $httpBackend.whenGET('dump').passThrough();
        $httpBackend.whenGET('health').passThrough();
        $httpBackend.whenGET('metrics/metrics').passThrough();
        // $httpBackend.whenGET('resources/components/swagger-ui').passThrough();
        $httpBackend.whenGET(/^resources\/?.*/).passThrough();
        $httpBackend.whenPOST(/^oauth\/?.*/).passThrough();
    });
