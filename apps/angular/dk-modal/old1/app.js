// http://plnkr.co/edit/YklthDZcknmvMjU5A6pe?p=preview
// http://stackoverflow.com/questions/17151940/angularjs-custom-confirm-box

angular
    .module('App', ['ui.bootstrap'])
    .controller('AppController', ['$scope', function($scope) {

        $scope.delete = function () {
            alert('Woho, Im deleted!');
        };

    }])
    .directive('dkmodal', ['$modal', '$parse', function($modal, $parse) {
        return {
            link: function (scope, el, attr) {

                el.bind('click', function () {

                    var instance = $modal.open ({

                        templateUrl: './dk-modal.tmpl.html',
                        controller: ['$scope', '$modalInstance', modalController]
                    });

                    instance.result.then (function () {

                        $parse(attr.onConfirm)(scope);  // close - action!
                    }, function() {
                        // dimisss - do nothing
                    });
                });

            }
        };

        function modalController(modalScope, $modalInstance) {

            modalScope.ok = function () {
                modalInstance.close();
            };

            modalScope.cancel = function () {
                modalInstance.dismiss();
            };

        }
    }]);