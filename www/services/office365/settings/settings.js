
var O365Auth;
(function (O365Auth) {
    (function (Settings) {
        Settings.clientId = '5d0427f8-cc37-419a-920e-8705bcf0a606';
        Settings.authUri = 'https://login.microsoftonline.com/common/';
        Settings.redirectUri = 'http://localhost:4400/services/office365/redirectTarget.html';
        //Settings.domain = 'lagash.com';
    })(O365Auth.Settings || (O365Auth.Settings = {}));
    var Settings = O365Auth.Settings;
})(O365Auth || (O365Auth = {}));

var yammerAuth;
(function (yammerAuth) {
    (function (Settings) {
        //Settings.clientId = 'EMkqq7wLTN0ENIMd3nb7Ig';
        Settings.clientId = 'yz7ubHGXrwBJuJWARF912Q';
        Settings.redirectUri = 'http://localhost:4400/services/office365/redirectTarget.html';
        Settings.authYammerUri = 'https://www.yammer.com';
        Settings.baseUri = 'https://www.yammer.com/';
        // Settings.domain = 'lagash.com';
    })(yammerAuth.Settings || (yammerAuth.Settings = {}));
    var Settings = yammerAuth.Settings;
})(yammerAuth || (yammerAuth = {}));