Accounts.oauth.registerService('headquarters');

if (Meteor.isClient) {
  Meteor.loginWithHeadquarters = function(options, callback) {
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Headquarters.requestCredential(options, credentialRequestCompleteCallback);
  };
} else {
  var autopublishedFields = ['email'];

  Accounts.addAutopublishFields({
    forLoggedInUser: autopublishedFields,
    forOtherUsers: autopublishedFields
  });
}
