/**
 * This class contains utilities
 *
 * @class Utils
 * @constructor
 */
Debugger.Utils = (function() {

  /**
   * Checks if an object is an array
   *
   * @public
   * @name Debugger.Utils#isArray
   * @function
   * @param  {Object}  object The object that will be checked.
   * @return {Boolean} Returns true if tis an array.
   */
  return {
    isArray: function(object) {
      return toString.call(object) == '[object Array]';
    }
  };

}());
