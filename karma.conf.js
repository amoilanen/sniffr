module.exports = function (karma) {
  let configuration = {
    basePath: '.',
    frameworks: ['mocha'],
    files: [
      { pattern: 'node_modules/chai/chai.js', include: true },
      'src/*.js',
      'spec/*.js'
    ],
    reporters: ['spec'],
    browsers: ['Chrome'],
    singleRun: true,
    client: {
      mocha: {
        reporter: 'html'
      }
    }
  };
  if (karma.tdd) {
    configuration = Object.assign(configuration, {
      browsers: ['Chrome'],
      reporters: ['dots'],
      singleRun: false,
      autoWatch: true
    });
  }
  karma.set(configuration);
}