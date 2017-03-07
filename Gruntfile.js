module.exports = function(grunt) {

require('load-grunt-tasks')(grunt)
  
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),

    clean: ['scripts/js', 'scripts/bundle.js'],
    
    babel: {
	  options: {
	    plugins: ['transform-react-jsx'],
	    presets: ['es2015', 'react']
	  },
	  jsx: {
	    files: [{
	      expand: true,
	      cwd: 'scripts/jsx/',
	      src: ['*.jsx', '**/*.jsx'],
	      dest: 'scripts/js/',
	      ext: '.js'
	    }]
	  }
	},

	browserify: {
	  dist: {
	    files: {
	      'scripts/bundle.js': ['scripts/js/*.js', 'scripts/js/**/*.js']
	    },
	    options: {}
	  }
	},

	watch: {
	  scripts: {
	    files: ['scripts/jsx/*.jsx', 'scripts/jsx/**/*.jsx'],
	    tasks: ['default'],
	    options: {
	      spawn: false,
	    },
	  },
	},

  });

  grunt.registerTask('default', ['clean', 'babel', 'browserify', 'watch']);

};