/**
 * Responsible for storing the logs in memory.
 *
 * @class Memory
 * @constructor
 */
DebuggerJS.Loggers.Memory = (function() {

  /**
   * The array that all the logs will be appended to.
   *
   * @private
   * @type {Array}
   */
  var _logs = [];

  /**
   * Pushes whatever you pass to the array.
   *
   * @public
   * @function
   * @return {Boolean} Is true if nothing goes wrong.
   */
  this.log = function() {
    _logs.push(['Log:'].concat(arguments));
    return true;
  };

  /**
   * Pushes whatever you pass to the array as an error log.
   *
   * @public
   * @function
   * @return {Boolean} Is true if nothing goes wrong.
   */
  this.error = function() {
    _logs.push(['Error:'].concat(arguments));
    return true;
  };

  /**
   * Pushes whatever you pass to the array as a warning log.
   *
   * @public
   * @function
   * @return {Boolean} Is true if nothing goes wrong.
   */
  this.warn = function() {
    _logs.push(['Warning:'].concat(arguments));
    return true;
  };

});
