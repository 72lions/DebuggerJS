/**
 * Responsible for logging in the console.
 *
 * @class Console
 * @constructor
 */
DebuggerJS.Loggers.Console = (function() {

  /**
   * Logs whatever you pass it in the console.
   *
   * @public
   * @function
   * @return {Boolean} Is true if nothing goes wrong.
   */
  this.log = function() {
    console.log.apply(console, arguments);
    return true;
  };

  /**
   * Logs an error with whatever arguments you pass it to the console.
   *
   * @public
   * @function
   * @return {Boolean} Is true if nothing goes wrong.
   */
  this.error = function() {
    console.error.apply(console, arguments);
    return true;
  };

  /**
   * Logs a warning with whatever arguments you pass it to the console.
   *
   * @public
   * @function
   * @return {Boolean} Is true if nothing goes wrong.
   */
  this.warn = function() {
    console.warn.apply(console, arguments);
    return true;
  };

});
