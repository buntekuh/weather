module.exports = function(config) {
  config.set({
    logLevel: config.LOG_DEBUG,
    frameworks: ['jasmine'],
    reporters: ['spec'],
    browsers: ['Chrome'],

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },

    files: [
      'bower_components/angular/angular.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/ng-midway-tester/src/ngMidwayTester.js',
      'src/**/*.js',
      'test/**/*.js'
    ],
    colors: true,
    concurrency: Infinity
  });
};