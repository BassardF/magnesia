module.exports = function(grunt) {

require('load-grunt-tasks')(grunt)
  
  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),

    clean: ['scripts/js', 'scripts/bundle.js', 'styles/css/result.css'],
    
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
	    files: ['scripts/jsx/*.jsx', 'scripts/jsx/**/*.jsx', 'styles/less/**.less'],
	    tasks: ['default'],
	    options: {
	      spawn: false,
	    },
	  },
	},

	less: {
		development: {
			options: {},
			files: {
				'styles/css/result.css': 'styles/less/include.less'
			}
		}
	},

  });

  grunt.registerTask('default', ['clean', 'less', 'babel', 'browserify', 'watch']);

};