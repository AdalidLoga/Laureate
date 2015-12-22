

(function () {
    'use strict';
    angular.module('laureateO365').factory('app365api', [app365api]);

    function app365api() {

        var authContext;
        var authYammerContext;
        var authtoken;
        var accessToken;
        var outlookClient;
        var yammerClient;
        var messageFetcher;
        var userName;

        // Login to O365
        function login(callback) {
            if (!authContext) {
                authContext = new O365Auth.Context();
            }

            authContext.getIdToken("https://outlook.office365.com/")
           .then((function (token) {
               // Get auth token
               authtoken = token;
               // Get user name from token object.
               userName = token.givenName + " " + token.familyName;
               // Create Outlook client object.
               outlookClient = new Microsoft.OutlookServices.Client('https://outlook.office365.com/api/v1.0', authtoken.getAccessTokenFn('https://outlook.office365.com'));

               // Callback without parameter to indicate successful sign-in.
               callback();
           }), function (error) {
               // Log sign-in error message.
               console.log('Failed to login. Error = ' + error.message);
               callback(error.message);
           });
        };

        function loginYammer(callback)
        {
            if (!authYammerContext) {
                authYammerContext = new yammerAuth.Context();
            }

            authYammerContext.getIdToken("https://www.yammer.com/lagash.com/oauth2/authorize")
          .then((function (token) {
              // Get auth token
              authtoken = token;
              // Get user name from token object.
              userName = token.givenName + " " + token.familyName;

              accessToken = token._accessToken.token;
             
              callback();
          }), function (error) {
              // Log sign-in error message.
              console.log('Failed to login. Error = ' + error.message);
              callback(error.message);
          });
        };

        function getYamAccestoken() {
            return accessToken;
        }

        // Logout
        function logout() {
            if (!authContext) {
                authContext = new O365Auth.Context();
            }

            if (!authYammerContext) {
                authYammerContext = new yammerAuth.Context();
            }
            authYammerContext.logOut();
            authContext.logOut();
        };

        // Get signed-in user name.
        function getUserName() {
            return userName;
        };


        return {
            login: login,
            logout: logout,
            loginYammer: loginYammer,
            getUserName: getUserName,
            getYamAccestoken: getYamAccestoken,
            exchangeClientObj: function () { return outlookClient; }
        };
    };
})();