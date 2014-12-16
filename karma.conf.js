module.exports = function(config) {
  config.set({
    basePath: '',
    
    frameworks: ['mocha'],
    browsers: ['PhantomJS'],
    reporters: ['spec', 'progress', 'coverage'],

    preprocessors: { 'dist/formi.js': ['coverage'] },

    coverageReporter: {
      type: 'lcov',
      dir: 'coverage/'
    },

    files: [
      'dist/formi.js',
      'test/**/*.js'
    ],

    client: {
      mocha: {
        ui: 'tdd',
        timeout: '5000'
      }
    },

    port: 9876,
    logLevel: config.LOG_INFO,
    colors: true,
    singleRun: true
  });
};
