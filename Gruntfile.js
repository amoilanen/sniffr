module.exports = function (grunt)
{

  var sources = [
    'src/modern.js.polyfill.js',
    'src/sniffr.js'
  ];

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
        undef: false,
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
    },
    uglify: {
      dist: {
        files: {
          'dist/sniffr.min.js': sources
        }
      }
    },
    concat: {
      dist: {
        src: sources,
        dest: 'dist/sniffr.js',
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jasmine']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('dist', ['uglify:dist', 'concat:dist']);
  grunt.registerTask('default', ['jshint', 'test', 'dist']);
};