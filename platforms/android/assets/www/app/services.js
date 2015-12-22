(function () {
    "use strict";

    angular.module("laureateO365.services", []).factory("laureateO365Service", ["$rootScope", "$http", function ($rootScope, $http) {
        var laureateO365 = {};

        //starts and stops the application waiting indicator
        laureateO365.wait = function (show) {
            if (show)
                $(".spinner").show();
            else
                $(".spinner").hide();
        };

        return laureateO365;
    }]);
})();