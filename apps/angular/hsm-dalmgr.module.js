'use strict';

angular.module('hsm-dalmgr', [
        'angularjs-dropdown-multiselect',
        'cgcaform.module',
        'cgcatab.module',
        'cgcatree.module',
        'checklist-model',
        'commonUtil.module',
        'dalmgrtabs.module',
        'dashboard.module',
        'dropdown-multiselect',
        'health.module',
        'hsm-dalmgr.constraints',
        'hsm-dalmgr.controller',
        'hsm-dalmgr.filter',
        //'hsm-dalmgr.mocks',
        'hsm-dalmgr.service',
        'jcs-autoValidate',
        'language.module',
        'limitfields.module',
        'login.module',
        'logsettings.module',
        'metrics.module',
        'mml.module',
        'mock.module',
        'modal.module',
        'pascalprecht.translate',
        'ui.router',
        'ui.bootstrap',
        'ui.commonheader',
        'valdr',
        'validations.module',
        'wings-common-ui'])
    .run(function ($http,
                   $httpBackend,
                   $location,
                   $rootScope,
                   $translate,
                   Auth,
                   LanguageService,
                   Role,
                   validator,
                   myCustomErrorMessageResolver,
                   myCustomElementModifier) {
        $rootScope.$on('$stateChangeStart', function (event, next) {
            $http.get('resources/assets/img/authentication_check.gif');
            Auth.isLoggedInAsync(function (loggedIn) {
                if (next.authenticate && !loggedIn)
                {
                    $rootScope.errorMessage = 'errors.login';
                    $location.path('/error');
                }
                if (next.authenticate &&
                        next.roles !== undefined && !Role.hasRole(next.roles)) {
                    $rootScope.errorMessage = 'errors.403';
                    $location.path('/error');
                } else if ($location.path() !== '/login') {
                    var search = $location.search();
                    if (search.redirect !== undefined) {
                        $location.path(search.redirect).search('redirect', null).replace();
                    }
                }
            });
        });

        // Call when the the client is confirmed
        $rootScope.$on('event:auth-loginConfirmed', function (data) {
            $rootScope.authenticated = true;
            //data is the user that was just logged in. set the language for the user
            var languageKey = $rootScope.currentAccount.langKey;
            $translate.use(languageKey);
            LanguageService.getBy(languageKey).then(function (languages) {
                $rootScope.languages = languages;
            });
            $location.path('/mml');
            // we configure validations here rather then in the auto-val run to make testing easier.
            validator.setValidElementStyling(false);
            validator.setErrorMessageResolver(myCustomErrorMessageResolver.resolve);
            validator.registerDomModifier(myCustomElementModifier.key, myCustomElementModifier);
            validator.setDefaultElementModifier(myCustomElementModifier.key);
        });
    });
