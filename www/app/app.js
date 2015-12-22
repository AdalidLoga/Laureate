(function () {
    "use strict";

    angular.module("laureateO365", ["ionic", "laureateO365.controllers", "laureateO365.services"])
        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                //$ionicPlatform.overlaysWebView(false);
                //$ionicPlatform.style(3)
                if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                //if (window.StatusBar) {
                //   // StatusBar.styleDefault();
                   
                //}
            });
           
        })
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
            .state("app", {
                url: "/app",
                abstract: true,
                templateUrl: "app/templates/view-menu.html",
                controller: "appCtrl"
            })
            .state("app.home", {
                url: "/home",
                cache: false,
                templateUrl: "app/templates/view-home.html"
            })
            .state("app.home.feed", {
                url: "/feed",
                cache: false,
                views: {
                    "tab-home-feed": {
                        templateUrl: "app/yammer/yam-feed.html"
                    }
                }
            })
            .state("app.home.mail", {
                url: "/all/id:all",
                cache: false,
                views: {
                'tab-home-mail': {
                    templateUrl: "app/mail/mail-list.html"
                }
            }
            })
            .state("app.email", {
                url: "/email",
                cache: false,
                templateUrl: "app/mail/mail-tabs.html"
            })
            .state("app.email.all", {
                url: "/all/id:all",
                cache: false,
                views: {
                    "tab-all-mail": {
                        templateUrl: "app/mail/mail-list.html"
                    }
                }
            })
            .state("app.email.imp", {
                url: "email/imp/id:important",
                cache:false,
                views: {
                    "tab-imp-mail": {
                        templateUrl: "app/mail/mail-list.html"
                    }
                }
            })
            .state("app.email.unread", {
                url: "/unread/id:unread",
                cache: false,
                views: {
                    "tab-unread-mail": {
                        templateUrl: "app/mail/mail-list.html"
                    }
                }
            })
             .state("app.email-detail", {
                 url: "/mail/:id",
                 cache: false,
                 templateUrl: "app/mail/mail-detail.html"
               
             })
            .state("app.email-create", {
                url: "/mail/:id",
                cache: false,
                templateUrl: "app/mail/mail-create.html"

            })
            .state("app.yam", {
                url: "/yam",
                cache: false,
                templateUrl: "app/yammer/yam-tabs.html"
            })
            .state("app.yam.feed", {
                url: "/feed",
                cache: false,
                views: {
                    "tab-yam-feed": {
                        templateUrl: "app/yammer/yam-feed.html"
                    }
                }
            })
            .state("app.yam.contacts", {
                url: "/contacts",
                cache: false,
                views: {
                    "tab-yam-contacts": {
                        templateUrl: "app/yammer/yam-feed.html"
                    }
                }
            })
            .state("app.yam.messages", {
                url: "/messages",
                cache: false,
                views: {
                    "tab-yam-msg": {
                        templateUrl: "app/yammer/yam-feed.html"
                    }
                }
            })

            //CALENDAR STATES
            // Add new event page.
            .state('app.newEvent', {
                url: "/newevent",
                views: {
                    'mainContent': {
                        templateUrl: "app/calendar/add-event.html"
                    }
                }
            })

            // Event list page.
            .state('app.calendar', {
                url: "/calendar",
                cache: false,
                templateUrl: "app/calendar/calendar.html"
            })

             // List of today's event page.
            .state('app.calendar.month', {
                url: "/month/id:month",
                cache: false,
                views: {
                    "tab-month-calendar": {
                        templateUrl: "app/calendar/calendar.html"
                    }
                }
            })

            // List of today's event page.
            .state('app.calendar.today', {
                url: "/today/id:today",
                cache: false,
                views: {
                    "tab-today-calendar": {
                        templateUrl: "app/calendar/calendar-list.html"
                    }
                }
            })

            // Event detail page.
            .state('app.calendar-detail', {
                url: "/calendar/:id",
                views: {
                    'mainContent': {
                        templateUrl: "app/calendar/calendar-detail.html"
                    }
                }
            })

            // List of tomorrow's event page.
            .state('app.calendar.tomorrow', {
                url: "/tomorrow/id:tomorrow",
                views: {
                    "tab-tomorrow-calendar": {
                        templateUrl: "app/calendar/calendar-list.html"
                    }
                }
            })

             // All events list page.
            .state('app.calendar.all', {
                url: "/all/id:all",
                views: {
                    "tab-all-calendar": {
                        templateUrl: "app/calendar/calendar-list.html"
                    }
                }
            })

                 // Sign-out page
            .state('app.sign-out', {
                url: "/sign-out",
                cache: false,
                templateUrl: "app/auth/sign-out.html"
               
            })

            .state('login', {
                cache: false,
                url: "/login",
                templateUrl: "app/auth/sign-in.html"
            });

            $urlRouterProvider.otherwise("/login");
        });
})();