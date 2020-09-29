const svgr = require('@svgr/rollup').default;

module.exports = {
  rollup(config, options) {
    config.plugins = [svgr(), ...config.plugins];

    return config;
  },
};
