var Headquarters = Npm.require('headquarters-node');
var Fiber = Npm.require('fibers')
var Future = Npm.require('fibers/future')

Fiber(function() {
  OAuth.registerService('headquarters', 2, null, function(query) {
    var config = ServiceConfiguration.configurations.findOne({
      service: 'headquarters'
    });

    if (!config)
      throw new ServiceConfiguration.ConfigError();

    var headquarters = Headquarters({
      clientID: config.clientId,
      clientSecret: config.secret,
      callbackURL: OAuth._redirectUri('headquarters', config)
    });

    var accessToken = getAccessToken(headquarters, query.code);
    var identity = getIdentity(headquarters);

    return {
      serviceData: {
        id: identity.email,
        accessToken: OAuth.sealSecret(accessToken),
        email: identity.email,
        username: identity.name
      },
      options: {
        profile: {
          name: identity.name,
          email: identity.email
        }
      }
    };
  });
}).run();

var getAccessToken = function(headquarters, code) {
  var future = new Future();

  headquarters
    .setCode(code)
    .then(function(accessToken) {
      future.return(accessToken);
    });

  return future.wait();
};

var getIdentity = function(headquarters) {
  var future = new Future();

  headquarters.member.me()
    .then(function(me) {
      future.return(me);
    });

  return future.wait();
};

Headquarters.retrieveCredential = function(token, secret) {
  return OAuth.retrieveCredential(token, secret);
};
