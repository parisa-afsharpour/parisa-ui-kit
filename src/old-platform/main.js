require('css-modules-require-hook')({
  extensions: ['.css','.scss'],
  generateScopedName: '[name]__[local]___[hash:base64:5]'
});

require('babel-polyfill');

require('babel-register')({
    presets: ['react', 'es2015', 'stage-2']
});

require('./server.js');

