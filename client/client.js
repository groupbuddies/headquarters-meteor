var requestCredential = function(options, credentialRequestCompleteCallback) {
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({
    service: 'headquarters'
  });

  if (!config) {
    if (credentialRequestCompleteCallback)
      credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
    return;
  }

  var loginStyle = OAuth._loginStyle('headquarters', config, options);

  var credentialToken = Random.id();

  var loginUrl = 'https://hq.groupbuddies.com' +
  "/oauth/authorize?" +
  "state=" + OAuth._stateParam(loginStyle, credentialToken) +
  "&response_type=code&" +
  "client_id=" + config.clientId;

  loginUrl += "&redirect_uri=" + OAuth._redirectUri('headquarters', config);

  OAuth.launchLogin({
    loginService: 'headquarters',
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: {
      width: 470,
      height: 420
    }
  });
};

Headquarters = {};
Headquarters.requestCredential = requestCredential;
