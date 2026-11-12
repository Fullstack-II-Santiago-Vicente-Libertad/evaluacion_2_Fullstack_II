// Jasmine define las pruebas y Karma las ejecuta en Chrome.
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    hostname: '127.0.0.1',
    listenAddress: '127.0.0.1',
    files: [{ pattern: 'test/index.js', watched: false }],
    preprocessors: { 'test/index.js': ['webpack'] },
    webpack: {
      mode: 'development',
      devtool: 'inline-source-map',
      resolve: { extensions: ['.js', '.jsx'] },
      module: {
        rules: [{
          test: /\.jsx?$/,
          exclude: /node_modules/,
          resolve: { fullySpecified: false },
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: { chrome: '100' } }],
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
              plugins: [['babel-plugin-istanbul', {
                include: ['src/**/*.js', 'src/**/*.jsx'],
                exclude: ['src/main.jsx'],
              }]],
            },
          },
        }],
      },
      stats: 'errors-warnings',
    },
    webpackMiddleware: { stats: 'errors-only' },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      dir: 'coverage',
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'json-summary', file: 'coverage-summary.json' },
        { type: 'lcovonly', file: 'lcov.info' },
      ],
    },
    browsers: [process.env.KARMA_BROWSER || 'ChromeHeadless'],
    // Esta opción solo se usa en contenedores que no admiten el sandbox de Chrome.
    customLaunchers: {
      ChromeHeadlessSinSandbox: { base: 'ChromeHeadless', flags: ['--no-sandbox', '--disable-dev-shm-usage'] },
    },
    client: { jasmine: { random: false }, clearContext: false },
    singleRun: true,
    autoWatch: false,
    browserNoActivityTimeout: 60000,
  });
};
