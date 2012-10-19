/**
 * Responsible for parsing the data in the default way.
 * @example
 *     RADIO | Performance for serializing is 15 35 | Tags: performance, serializing
 *
 * @class Default
 * @constructor
 */
Debugger.Parsers.Default = (function() {

  /**
   * Returns an array with the formated log message.
   *
   * @param {String} module The module that this log belongs to.
   * @param {Array} message An array that holds all the messages that the user
   * needs to log.
   * @param {String} tag The tag that the log is associated with.
   * @return {Array} The array that will be send to the logger.
   */
  this.parse = function(module, message, tag) {
    module = module + ' |';
    return [module].concat(message).concat('| Tag: ' + tag);
  };

});
