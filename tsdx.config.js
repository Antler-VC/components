const svg = require('rollup-plugin-svg');

module.exports = {
  rollup(config) {
    config.plugins.push(svg({ base64: true }));
    return config;
  },
};
