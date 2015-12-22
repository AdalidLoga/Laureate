(function () {
    'use strict';

    angular.module('laureateO365').controller('mailCreateCtrl', ['$scope', '$state', '$stateParams', '$ionicLoading', '$ionicPopup', 'app365api', mailCreateCtrl]);

    function mailCreateCtrl($scope, $state, $stateParams, $ionicLoading, $ionicPopup, app365api) {

        var vm = this;
        var outlookClient;
        $scope.current = this;
        this.recipients = '';
        this.messageBody = '';
        this.subject = '';

        function createMessage(subject, body, recipients) {
            return {
                Subject: subject,
                Body: {
                    ContentType: "Text",
                    Content: body
                },
                ToRecipients: [
                  {
                      EmailAddress: {
                          Address: recipients
                      }
                  }
                ]
                //Attachments: [
                //  {
                //      "@odata.type": "#Microsoft.OutlookServices.FileAttachment",
                //      "Name": "menu.txt",
                //      "ContentBytes": "bWFjIGFuZCBjaGVlc2UgdG9kYXk="
                //  }
                //]
            };
        };

        $scope.clearFields = function() {
            var thisinstance = this;
            thisinstance.current.subject = '';
            thisinstance.current.messageBody = '';
            thisinstance.current.recipients = '';
        };

        $scope.sendMessage = function () {
            var thisinstance = this;
            
            var message = createMessage(thisinstance.current.subject, thisinstance.current.messageBody, thisinstance.current.recipients);
            outlookClient.me.sendMail(message).then((function () {
                var thisinstance = this;
                thisinstance.clearFields();
                $state.go('app.email.all');
            }).bind(thisinstance), function (error) {
                // Log the error message when error is encountered while deleting the mail.
                console.log('fail send mail. Error = ' + error.message);
                $ionicLoading.show({
                    template: 'Failed send message. Error: ' + error.message,
                    noBackdrop: true,
                    duration: 1500
                });
            });

        };

        vm.loadList = function () {
            // Get the Outlook client object.
            outlookClient = app365api.exchangeClientObj();
           
        };

        vm.loadList();
    }
})();