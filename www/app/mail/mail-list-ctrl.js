(function () {
    'use strict';

    angular.module('laureateO365').controller('mailCtrl', ['$scope', '$state', '$stateParams', '$ionicLoading', '$ionicPopup', 'app365api', mailCtrl]);

    function mailCtrl($scope,$state, $stateParams, $ionicLoading, $ionicPopup, app365api) {
        var vm = this;
        var outlookClient;
      
        function createMessage(subject , body, recipients)
        {
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

        // Get mail list.
        function getMails() {
            var filterQuery = '';
            // outlookClient.me.messages.addMessage('algo');
           

            // Get all mails flagged as important.
            if (typeof  $stateParams.important != 'undefined') {
                getImpMails();
                return;
            }

            // Get all unread mails.
            if (typeof  $stateParams.unread != 'undefined') {
                filterQuery = 'IsRead eq false';
            }          

            // Fetch Inbox folder
            outlookClient.me.folders.getFolder("Inbox").messages.getMessages().filter(filterQuery).fetch()            
                .then(function (mails) {
                    // Get current page. Use getNextPage() to fetch next set of mails.
                    vm.mails = mails.currentPage;
                    $scope.$apply();
                });
            
        };

        // Get all mails flagged as important.
        function getImpMails() {
            // Filter to fetch all important mails received after 2000-10-20
            var filterQuery = "Importance eq 'High' and DateTimeReceived gt 2000-10-20";
            outlookClient.me.folders.getFolder("Inbox").messages.getMessages().filter(filterQuery).orderBy('Importance,DateTimeReceived desc').fetch()           
                .then(function (mails) {
                    // Get current page. Use getNextPage() to fetch next set of mails.
                    vm.mails = mails.currentPage;
                    $scope.$apply();
                }, function (error) {
                    console.log("Error encountered while fetching mails. Error: " + error.message);
                });            
        };

        $scope.createMail = function () {
            $state.go('app.email-create');
        };

        // Delete mail
        $scope.deletemail = function (mail) {
            // Ionic pop-up to confirm delete action.
            var confirmPopup = $ionicPopup.confirm({
                title: 'Mail App',
                template: 'Are you sure you want to delete the mail?'
            });
            confirmPopup.then(function (res) {
                if (res) {
                    // Fetch the mail with specified mail id.
                    outlookClient.me.folders.getFolder("Inbox").messages.getMessage(mail.id).fetch()
                    .then(function (mail) {
                        // Delete the mail.
                        mail.delete()
                        .then((function (response) {
                            // Show the message indicating mail was deleted successfully.
                            $ionicLoading.show({ template: 'Message deleted successfully !!', noBackdrop: true, duration: 1000 });
                            // Refresh the mail list.
                            getMails();
                        }), function (error) {
                            // Log the error message when error is encountered while deleting the mail.
                            console.log('fail to delete mail. Error = ' + error.message);
                            $ionicLoading.show({
                                template: 'Failed to delete message. Error: ' + error.message
                                , noBackdrop: true, duration: 1500
                            });
                        });
                    });
                } else {
                    // do nothing when user cancel on delete confirmation dialog.                      
                }
            });              
        };

        vm.loadList = function () {
            // Get the Outlook client object.
            outlookClient = app365api.exchangeClientObj();
            // Get mails.
            getMails();
        };

        vm.loadList();
    }
})();