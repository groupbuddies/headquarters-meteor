Package.describe({
  name: 'gabrielpoca:headquarters',
  version: '0.0.4',
  summary: 'Meteor wrapper for the Headquarters',
  git: 'https://github.com/groupbuddies/headquarters-meteor',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.2');

  api.use('random', ['client', 'server']);
  api.use('http', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('oauth2', ['client', 'server']);
  api.use('service-configuration', ['client', 'server']);
  api.use('templating', 'client');
  api.use('underscore', ['client', 'server']);

  api.export('Headquarters');

  api.addFiles([
    'server/server.js'
  ], 'server');

  api.addFiles([
    'client/configure.html',
    'client/configure.js'
  ], 'client');

  api.addFiles([
    'client/client.js',
  ], 'client');
});

Npm.depends({
  'headquarters-node': '0.1.2'
});
