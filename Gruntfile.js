module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
        development: {
          files: {
            'public/stylesheets/style.css'       : 'public/stylesheets/style.less',
          }
        }
    },
    watch: {
        src: {
          files: ['public/stylesheets/*.less'],
          tasks: ['dev']
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['less:development']);
  grunt.registerTask('dev', ['less:development']);

};