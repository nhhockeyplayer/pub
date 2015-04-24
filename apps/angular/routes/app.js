// Code goes here

angular
    .module('App', ['ui.bootstrap'])

    .controller('AppController', ['$scope', function($scope) {

        $scope.delete = function() {
            alert('Woho, Im deleted!');
        };

    }])


    .directive('confirm', ['$modal', '$parse', function($modal, $parse) {
        return {
            link: function(scope, el, attr) {
                el.bind('click', function() {
                    var instance = $modal.open({
                        templateUrl: 'dk-modal.tmpl.html',
                        controller: ['$scope', '$modalInstance', function(s, m) {
                            s.ok = function() {
                                m.close();
                            };
                            s.cancel = function() {
                                m.dismiss();
                            };
                        }]
                    });

                    instance.result.then(function() {
                        // close - action!
                        $parse(attr.onConfirm)(scope);
                    },
                        function() {
                            // dimisss - do nothing
                        });
                });
            }
        }
    }])