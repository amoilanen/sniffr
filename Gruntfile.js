module.exports = function (grunt)
{

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [
        'Gruntfile.js',
        'src/*.js'
      ],
      options: {
        multistr: true,
        node: true,
        curly: false,
        eqeqeq: true,
        immed: true,
        latedef: false,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      }
    },
    jasmine: {
      pivotal: {
        src: [
          './src/*.js'
        ],
        options: {
          specs: 'spec/*.spec.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('default', ['jshint', 'test']);
};