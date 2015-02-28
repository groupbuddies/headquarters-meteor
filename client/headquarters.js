Accounts.oauth.registerService('headquarters');

if (Meteor.isClient) {
  Meteor.loginWithHeadquarters = function(options, callback) {
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var completeCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
    Headquarters.requestCredential(options, completeCallback);
  };
} else {
  var autopublishedFields = ['services.headquarters.email'];

  Accounts.addAutopublishFields({
    forLoggedInUser: ['services.headquarters'],
    forOtherUsers: ['services.headquarters.email']
  });
}
