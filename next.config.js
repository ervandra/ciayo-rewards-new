require('dotenv').config();
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  useFileSystemPublicRoutes: false,

  webpack(config) {
    const originalEntry = config.entry;
    config.plugins = config.plugins || [];
    config.plugins = [
      ...config.plugins,
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),
    ];
    config.entry = async () => {
      const entries = await originalEntry();
      if (entries['main.js']) {
        entries['main.js'].unshift('./lib/polyfills.js');
      }
      return entries;
    };
    return config;
  },
};
