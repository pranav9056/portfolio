module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  var config = grunt.file.readYAML('Gruntconfig.yml')
  grunt.initConfig({
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: config.cssDir,
          src: ['*.css', '!*.min.css'],
          dest: config.mincssDir,
          ext: '.min.css'
        }]
      }
    },
    concat: {
      dist: {
        src: config.mincssDir+'*.min.css',
        dest: config.concatmincssDir+'min_concat.css'
      }
    },
    connect: {
      server:{
        port: 9000,
        hostname: 'localhost',
        base: ['.'],
        livereload: true
      }
    },


    responsive_images: {
      dev: {
        options: {
          sizes: [{

            width: 1600 ,
            suffix: '_large_2x',
            quality:50

          },
          {

            width: 800 ,
            suffix: '_medium_1x',
            quality:50

          },
          {
            aspectratio: false,
            width: 500,
            gravity: 'west',
            suffix: 'c'

          }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: config.imgDir,
          dest: config.imgReDir
        }]
      },
      thumb:{
        options: {
          sizes: [{

            width: 750,
            quality:60

          },
          {

            width: 550,
            quality:60

          },
          {
            width: 350,
            quality:60
          }]
        },

        /*
        You don't need to change this part if you don't change
        the directory structure.
        */
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: config.imgThumb,
          dest: config.imgReDir
        }]

      }


    },

    /* Clear out the images directory if it exists */
    clean: {
      dev: {
        src: [config.imgDir],
      },
    },

    /* Generate the images directory if it is missing */
    mkdir: {
      dev: {
        options: {
          create: [config.imgDir]
        },
      },
    },

    /* Copy the "fixed" images that don't go through processing into the images/directory */
    copy: {
      dev: {
        files: [{
          expand: true,
          src: 'images_src/fixed/*.{gif,jpg,png}',
          dest: 'images/'
        }]
      },
    },
    watch: {
      options: {
        livereload: true,
      },
      cssmin: {
        files: [config.cssDir + '*.css', config.cssDir + '!*.min.css'],
        tasks: ['cssmin']
      },
      concat: {
        files: [config.mincssDir + '*.min.css'],
        tasks: ['concat']
      },
      html:{
        files: 'index.html',
      }
    }


  });


  grunt.registerTask('default', [
    'cssmin',
    'concat',
    'connect',
    'responsive_images',
    'watch'

  ]);

};
