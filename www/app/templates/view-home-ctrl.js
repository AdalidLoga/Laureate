(function () {
    'use strict';

    angular.module('laureateO365').controller('homeCtrl', ['$http', '$scope', '$state', 'app365api', homeCtrl]);
   

    function homeCtrl($http, $scope, $state, app365api) {
        var outlookClient;
        var vm = this;

        var onloginYam = function (reason) {
            if (typeof reason == 'undefined') {
                // $state.go('app.home.yam.myFeed');
            }

            getYamFeed();

          
        };

        app365api.loginYammer(onloginYam);

        function getMails() {
            var filterQuery = 'limit=5';

            // Fetch Inbox folder
            outlookClient.me.folders.getFolder("Inbox").messages.getMessages().fetch()
                .then(function (mails) {
                    // Get current page. Use getNextPage() to fetch next set of mails.
                    vm.mails = mails.currentPage;
                    $("#Content").show();
                    $scope.$apply();
                });

        };

        function getYamFeed() {

            var accesToken = app365api.getYamAccestoken();

            $http.defaults.headers.common['Authorization'] = 'Bearer ' + accesToken;

            $http({ method: 'GET', url: 'https://www.yammer.com/api/v1/messages.json?limit=5&include_activities=true&keep_seen_threads=true&prevent_empty_feed=true&threaded=extended&exclude_own_messages_from_unseen=true&r=' + Math.floor((Math.random() * 100) + 1) }).
                   success(function (data, status, headers, config) {
                       vm.feed = data.messages;
                       var user0 = data.references.filter(function (usr) { return usr.id == vm.feed[0].sender_id; })[0];
                       var user1 = data.references.filter(function (usr) { return usr.id == vm.feed[1].sender_id; })[0];
                       var user2 = data.references.filter(function (usr) { return usr.id == vm.feed[2].sender_id; })[0];
                       var user3 = data.references.filter(function (usr) { return usr.id == vm.feed[3].sender_id; })[0];
                       var user4 = data.references.filter(function (usr) { return usr.id == vm.feed[4].sender_id; })[0];

                       vm.feed[0].image = user0.mugshot_url;
                       vm.feed[0].fullName = user0.full_name;
                       vm.feed[0].createdAt = vm.feed[0].created_at.substring(0, 20);
                       vm.feed[1].image = user1.mugshot_url;
                       vm.feed[1].fullName = user1.full_name;
                       vm.feed[1].createdAt = vm.feed[1].created_at.substring(0, 20);
                       vm.feed[2].image = user2.mugshot_url;
                       vm.feed[2].fullName = user2.full_name;
                       vm.feed[2].createdAt = vm.feed[2].created_at.substring(0, 20);
                       vm.feed[3].image = user3.mugshot_url;
                       vm.feed[3].fullName = user3.full_name;
                       vm.feed[3].createdAt = vm.feed[3].created_at.substring(0, 20);
                       vm.feed[4].image = user4.mugshot_url;
                       vm.feed[4].fullName = user4.full_name;
                       vm.feed[4].createdAt = vm.feed[4].created_at.substring(0, 20);
                   }).
                   error(function (data, status, headers, config) {
                       alert(data);

                   });
        };

        $scope.GetClass = function (element)
        {
            if (element.active)
                return {
                    'swiper-slide-active': element.active
                };
            if (element.next)
                return {
                    'swiper-slide-next': element.next
                };
        }

        vm.loadList = function () {
            // Get the Outlook client object.
            $("#Content").hide();
            outlookClient = app365api.exchangeClientObj();
            getMails();
           
        };

        vm.loadList();
       
    }
})();