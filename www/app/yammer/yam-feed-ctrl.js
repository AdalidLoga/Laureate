(function () {
    'use strict';

    angular.module('laureateO365').controller('yamFeedCtrl', ['$scope', '$state', '$stateParams', '$ionicLoading', '$ionicPopup', '$http', 'app365api', yamFeedCtrl]);
    angular.module('laureateO365').directive('sbLoad', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            scope: { references: "=myAttribute", feedObj: "=sbLoad" },
            link: function (scope, elem, attrs) {
                //var user = scope.references.references.filter(usr => usr.id == scope.feedObj.sender_id)[0];
                var user = scope.references.references.filter(function (usr) { return usr.id == scope.feedObj.sender_id; })[0];
                elem[0].innerHTML = " <img src=" + user.mugshot_url + "><h2>" + user.full_name + "</h2><p>" + scope.feedObj.created_at.substring(0, 20) + "</p>";
            }
        };
    }]);

    

    function yamFeedCtrl($scope, $state, $stateParams, $ionicLoading, $ionicPopup,$http, app365api) {
        var vm = this;
        var outlookClient;

        function getYamFeed() {

            var accesToken = app365api.getYamAccestoken();
        
            $http.defaults.headers.common['Authorization'] = 'Bearer ' + accesToken;

            $http({ method: 'GET', url: 'https://www.yammer.com/api/v1/messages.json?limit=10&include_activities=true&keep_seen_threads=true&prevent_empty_feed=true&threaded=extended&exclude_own_messages_from_unseen=true&r=' + Math.floor((Math.random() * 100) + 1) }).
                   success(function (data, status, headers, config) {
                       vm.feed = data.messages;
                       vm.references = data.references;
                   }).
                   error(function (data, status, headers, config) {
                       alert(data);

                   });
        };


        var onloginYam = function (reason) {
            if (typeof reason == 'undefined') {
                getYamFeed();
                // $state.go('app.home.yam.myFeed');
            }
        };

        app365api.loginYammer(onloginYam);



          vm.loadList = function () {
            // Get the Outlook client object.
            outlookClient = app365api.exchangeClientObj();

           
        };

        vm.loadList();
    }


})();