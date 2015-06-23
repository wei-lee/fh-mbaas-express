module.exports = function(grunt) {
  'use strict';

  // Just set shell commands for running different types of tests
  grunt.initConfig({
    _test_runner: 'turbo',
    _unit_args: './test/unit',
    _accept_args: '--setUp ./test/setup.js --tearDown ./test/setup.js ./test/accept',

    // These are the properties that grunt-fh-build will use
    unit: '<%= _test_runner %> <%= _unit_args %>',
    unit_cover: 'istanbul cover --dir cov-unit <%= _test_runner %> -- <%= _unit_args %>',

    accept: '<%= _test_runner %> <%= _accept_args %>',
    accept_cover: 'istanbul cover --dir cov-accept <%= _test_runner %> -- <%= _accept_args %>'
  });

  grunt.loadNpmTasks('grunt-fh-build');
  grunt.registerTask('default', ['fh:default']);
};
