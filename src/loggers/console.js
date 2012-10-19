/**
 * Responsible for logging in the console.
 *
 * @class Console
 * @constructor
 */
Debugger.Loggers.Console = (function() {

  /**
   * Logs whatever you pass it in the console.
   *
   * @return {Boolean} Is true if nothing goes wrong.
   */
  this.log = function() {
    console.log.apply(console, arguments);
    return true;
  };

  /**
   * Logs an error with whatever arguments you pass it to the console.
   *
   * @return {Boolean} Is true if nothing goes wrong.
   */
  this.error = function() {
    console.error.apply(console, arguments);
    return true;
  };

  /**
   * Logs a warning with whatever arguments you pass it to the console.
   *
   * @return {Boolean} Is true if nothing goes wrong.
   */
  this.warn = function() {
    console.error.apply(console, arguments);
    return true;
  };

});
