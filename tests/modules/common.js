/**
 * Spotify Web Core tests common functions
 * @author Dariusz Dziuk <darius@spotify.com>
 *
 */

/* Modules */
var fs = require('fs');
var vm = require('vm');

(function() {

  var alreadyLoaded = {};

  /**
   * Runs code in a virtual machine
   *
   * @function
   * @private
   *
   * @param {String} path Absolute path to the code file.
   */
  var runInVm = function(path) {

    var code = fs.readFileSync(path);

    try {
      if (!alreadyLoaded[path]) {
        vm.runInThisContext(code, path);
        alreadyLoaded[path] = true;
      }
    } catch (exception) {
      console.error('exception on parsing (%s)', path, exception);
      throw exception;
    }

  };

  /**
   * Module exports
   *
   */
  module.exports = {

    /**
     * Includes a client-side JavaScript file
     *
     * @function
     * @public
     *
     * @param {String} path Absolute path to the file.
     *
     */
    includeAbs: function(path) {

      runInVm(path);

    },

    /**
     * Includes a client-side JavaScript file
     *
     * @function
     * @public
     *
     * @param {String} path Relative path to the file.
     *
     */
    include: function(path) {

      runInVm(__dirname + '/' + path);

    }

  };

})();
