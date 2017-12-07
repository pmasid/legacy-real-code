module.exports = function(grunt) {
  require('jit-grunt')(grunt);

  grunt.initConfig({
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "source/stylesheets/style-home.css": "source/stylesheets/less/style-home.less", // destination file and source file
          "source/stylesheets/style-about-us.css": "source/stylesheets/less/style-about-us.less",
          "source/stylesheets/style-cases.css": "source/stylesheets/less/style-cases.less",
          "source/stylesheets/style-clients.css": "source/stylesheets/less/style-clients.less",
          "source/stylesheets/style-education.css": "source/stylesheets/less/style-education.less",
          "source/stylesheets/style-venturing.css": "source/stylesheets/less/style-venturing.less",
          "source/stylesheets/style-blog.css": "source/stylesheets/less/style-blog.less",
          "source/stylesheets/style-career.css": "source/stylesheets/less/style-career.less",
          "source/stylesheets/style-gallery.css": "source/stylesheets/less/style-gallery.less",
          "source/stylesheets/style-services.css": "source/stylesheets/less/style-services.less"
        }
      }
    },
    watch: {
      styles: {
        files: ['source/stylesheets/less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
};