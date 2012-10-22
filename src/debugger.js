/**
 * The Debugger
 *
 * @class DebuggerJS
 * @constructor
 */
DebuggerJS = new (function() {

  this.Parsers = {};

  /**
   * The Loggers namespace
   *
   * @public
   * @name DebuggerJS#Loggers
   * @type {Object}
   */
  this.Loggers = {};

  /**
   * The Parsers namespace
   *
   * @public
   * @name DebuggerJS#Parsers
   * @type {Object}
   */
  this.Parsers = {};

  /**
   * The Utils namespace
   *
   * @public
   * @name DebuggerJS#Utils
   * @type {Object}
   */
  this.Utils = {
    /**
     * Checks if an object is an array
     *
     * @public
     * @name DebuggerJS.Utils#isArray
     * @function
     * @param  {Object} object The object that will be checked.
     * @return {Boolean} Returns true if tis an array.
     */
    isArray: function(object) {
      return toString.call(object) == '[object Array]';
    }
  };

  /**
   * The LOG constant.
   *
   * @private
   * @type {String}
   */
  var LOG = 'log';

  /**
   * The WARN constant
   *
   * @private
   * @type {String}
   */
  var WARN = 'warn';

  /**
   * The ERROR constant
   *
   * @private
   * @type {String}
   */
  var ERROR = 'error';

  /**
   * Is set to true if the logger is on
   *
   * @private
   * @type {Boolean}
   */
  var _isOn = false;

  /**
   * Contains all the active filters that will be used for deciding if
   * a log should go through or not.
   *
   * @private
   * @type {Object}
   */
  var _filters = {};

  /**
   * The object that will hold all the different loggers.
   *
   * @private
   * @type {Object}
   */
  var _loggers = {};

  /**
   * The object that will hold all the different parsers.
   *
   * @private
   * @type {Object}
   */
  var _parsers = {};

  /**
   * Checks the filters to see if it should allow the logging of a specific
   * log request
   *
   * @private
   * @function
   * @param {String} module The module of the log.
   * @param {String} tag The tag of the log.
   * @return {Boolean} Returns true if the log should be run.
   */
  var _checkFilters = function(module, tag) {

    var tagIsAllowed = false;
    var moduleIsAllowed = false;

    if (_filters.tags.length === 0) {
      tagIsAllowed = true;
    } else {
      if (_filters.tags.indexOf(tag) >= 0) {
        tagIsAllowed = true;
      } else {
        tagIsAllowed = false;
      }
    }

    if (_filters.modules.length === 0) {
      moduleIsAllowed = true;
    } else {
      if (_filters.modules.indexOf(module) >= 0) {
        moduleIsAllowed = true;
      } else {
        moduleIsAllowed = false;
      }
    }

    return tagIsAllowed && moduleIsAllowed;

  };

  /**
   * Figures out if it should log or not and then it loops through
   * all the loggers and execute the log, warn, error call.
   *
   * @private
   * @function
   * @param  {String} type The type of the log (log, warn, error).
   * @param  {String} module The specific module that needs to be logged.
   * @param  {Array} message An array with all the arguments to pass to the logger.
   * @param  {String} tag The specific tags that needs to be logged.
   * @return {Boolean} Is set to true if something was logged.
   */
  var _log = function(type, module, message, tag) {
    if (_isOn) {

      var parsedMessage;

      // Check if the message argument is an array
      if (!DebuggerJS.Utils.isArray(message)) {
        throw new Error('The message argument should be an array');
      }

      // Make sure that the module argument is a string
      module = typeof module === 'string' ? module : '';

      // Make sure that the tag argument is a string
      tag = typeof tag === 'string' ? tag : '';

      var shouldILog = _checkFilters(module, tag);

      if (shouldILog) {
        for (var identifier in _loggers) {
          // Parse the message
          parsedMessage = _parsers[identifier].parse(module, message, tag);
          if (type === LOG) {
            _loggers[identifier].log.apply(this, parsedMessage);
          } else if (type === WARN) {
            _loggers[identifier].warn.apply(this, parsedMessage);
          } else if (type === ERROR) {
            _loggers[identifier].error.apply(this, parsedMessage);
          }
        }
      } else {
        return false;
      }

      return true;
    }

    return false;
  };

  /**
   * Registers a new logger
   *
   * @public
   * @function
   * @name DebuggerJS#register
   * @param {Function} logger A logger that implements the "log" call.
   * @param {Function} parser A parser for parsing log message, module & tags.
   * @return {Boolean} It returns true if nothing breaks and no exceptions are
   * thrown.
   */
  this.register = function(identifier, logger, parser) {

    if (typeof identifier !== 'string' ||
        (typeof logger === 'undefined' || logger === null)) {
      throw new Error('Not valid arguments');
    }

    // Checks if this logger is not already registered.
    if (!_loggers[identifier]) {
      // Registers the new logger.
      _loggers[identifier] = logger;
    }

    // Checks if this parser is not already registered.
    if (!_parsers[identifier]) {
      // Registers the new parser.
      _parsers[identifier] = parser || new DebuggerJS.Parsers.Console();
    }

    return true;
  };

  /**
   * Logs a specific message
   *
   * @public
   * @function
   * @name DebuggerJS#log
   * @param {String} module The module that this log belongs to.
   * @param {Array} message An array that holds all the messages that the user
   * needs to log.
   * @param {String} tag The tag that the log is associated with.
   */
  this.log = function(module, message, tag) {
    return _log(LOG, module, message, tag);
  };

  /**
   * Logs a warning message
   *
   * @public
   * @function
   * @name DebuggerJS#warn
   * @param {String} module The module that this log belongs to.
   * @param {Array} message An array that holds all the messages that the user
   * needs to log.
   * @param {String} tag The tag that the log is associated with.
   */
  this.warn = function(module, message, tag) {
    return _log(WARN, module, message, tag);
  };

  /**
   * Logs an error message
   *
   * @public
   * @function
   * @name DebuggerJS#error
   * @param {String} module The module that this log belongs to.
   * @param {Array} message An array that holds all the messages that the user
   * needs to log.
   * @param {String} tag The tag that the log is associated with.
   */
  this.error = function(module, message, tag) {
    return _log(ERROR, module, message, tag);
  };

  /**
   * Enables the logger.
   * You can provide no arguments if you want to log
   * everything otherwise you can set either for which modules or tags you want
   * to the debugging information.
   *
   * @public
   * @function
   * @name DebuggerJS#on
   * @param  {Array} modules An array of modules that you want to allow debugging.
   * @param  {Array} tags An array of tags that you want to allow debugging.
   */
  this.on = function(modules, tags) {
    // Check if the message argument is an array
    if (typeof modules !== 'undefined' && !DebuggerJS.Utils.isArray(modules) && modules !== null) {
      throw new Error('The modules argument should be an array');
    }

    // Check if the tags argument is an array
    if (typeof tags !== 'undefined' && !DebuggerJS.Utils.isArray(tags) && tags !== null) {
      throw new Error('The tags argument should be an array');
    }

    _isOn = true;

    // Save the filters
    _filters = {
      modules: modules || [],
      tags: tags || []
    };

  };

  /**
   * Turns off the logger. No more logging.
   *
   * @public
   * @function
   * @name DebuggerJS#off
   */
  this.off = function() {
    _isOn = false;
    _filters = {};
  };

});
