(function () {
    'use strict';

    angular.module('laureateO365').controller('homeCtrl', ['$http', '$scope', '$state', 'app365api', homeCtrl]);
    angular.module('laureateO365').directive('myPostRepeatDirective', function () {
        return function (scope, element, attrs) {
            if (scope.$last) {
                // iteration is complete, do whatever post-processing
                // is necessary
                var swiper1 = new Swiper('.swiper1', {
                    //pagination: '.swiper-pagination1',
                    //paginationClickable: true,
                    spaceBetween: 30,
                });
            }
        };
    });
    angular.module('laureateO365').directive('swiperbottomdirective', function () {
        return function (scope, element, attrs) {
            if (scope.$last) {
                // iteration is complete, do whatever post-processing
                // is necessary
                var swiper2 = new Swiper('.swiper2', {
                    //pagination: '.swiper-pagination2',
                    //paginationClickable: true,
                    spaceBetween: 30,
                });

            }
        };
    });

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
                    vm.mails[0].active = true;
                    vm.mails[1].next = true;
                    $scope.$apply();
                });

        };

        function getYamFeed() {

            var accesToken = app365api.getYamAccestoken();

            $http.defaults.headers.common['Authorization'] = 'Bearer ' + accesToken;

            $http({ method: 'GET', url: 'https://www.yammer.com/api/v1/messages.json?limit=5&include_activities=true&keep_seen_threads=true&prevent_empty_feed=true&threaded=extended&exclude_own_messages_from_unseen=true&r=' + Math.floor((Math.random() * 100) + 1) }).
                   success(function (data, status, headers, config) {
                       vm.feed = data.messages;
                       vm.feed[0].active = true;
                       vm.feed[1].next = true;
                       vm.references = data.references;
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
            outlookClient = app365api.exchangeClientObj();
            getMails();
           
        };

        vm.loadList();
       
    }
})();