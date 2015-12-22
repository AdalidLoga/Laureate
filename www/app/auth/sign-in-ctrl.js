(function () {
    'use strict';

    angular.module('laureateO365').controller('signInCtrl', ['$http', '$scope', '$state', 'app365api', signInCtrl]);

    function signInCtrl($http, $scope, $state, app365api) {

       
        $scope.signIn = function () {
            app365api.login(onlogin);
        };

        var onlogin = function (reason) {
            if (typeof reason == 'undefined') {
                // Navigate to mail list page when sign-in was successful.
                $state.go('app.home');
            }
        };
    }
})();