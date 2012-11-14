DebuggerJS
==========

A JS debugger utility that helps you log and debug your applications. It's very flexible and allows you to write your
own loggers and parsers.

##How to use it


###Turn the debugger on with no filtering

 ```javascript
DebuggerJS.on();
```

###Turn the debugger off

 ```javascript
DebuggerJS.off();
```

###Filter modules

Log only stuff with a module name of 'Bootstrap'.
 ```javascript
DebuggerJS.on(['Bootstrap']);
```

###Filter tags

Log only stuff tagged as 'parsing'
 ```javascript
DebuggerJS.on(null, ['parsing']);
```

###Filter with both multiple tags and module names
 ```javascript
DebuggerJS.on(['Bootstrap', 'Gate'], ['parsing', 'serializing']);
```


###Register new loggers and parsers

With DebuggerJS you can register new loggers that output anywhere. At the same type you can also write parsers 
that will format the logs in whatever way you want. This give you the flexibility to log in a file, cookie, 
gather a few logs and send them via Ajax somewhere etc.

 ```javascript
DebuggerJS.register('console', new DebuggerJS.Loggers.Console(), new DebuggerJS.Parsers.Default());
```
You just need to make sure that the loggers have the following public methods that can accept any amount of arguments:
 ```javascript
  /**
   * Logs whatever you pass it in the console.
   * @return {Boolean} Is true if nothing goes wrong.
   */
  log(...arguments);

  /**
   * Logs an error with whatever arguments you pass it to the console.
   * @return {Boolean} Is true if nothing goes wrong.
   */
  error(...arguments);

/**
   * Logs a warning with whatever arguments you pass it to the console.
   * @return {Boolean} Is true if nothing goes wrong.
   */
  warn(...arguments);
```

The parsers need to have the following public methods.
 ```javascript
  /**
   * Returns an array with the formated log message.
   * @param {String} module The module that this log belongs to.
   * @param {Array} message An array that holds all the messages that the user
   * needs to log.
   * @param {String} tag The tag that the log is associated with.
   * @return {Array} The array that will be send to the logger.
   */
  parse(module, message, tag);
```

###Log stuff

You can log errors, warnings or normal information.
 ```javascript
DebuggerJS.log('ModuleName', ['Text to log', 'followed by an', object, 'etc'], 'tag');
DebuggerJS.warn('ModuleName', ['Text to log', 'followed by an', object, 'etc'], 'tag');
DebuggerJS.error('ModuleName', ['Text to log', 'followed by an', object, 'etc'], 'tag');
```

##A simple example

```javascript
DebuggerJS.register('console', new DebuggerJS.Loggers.Console(), new DebuggerJS.Parsers.Default());
DebuggerJS.on(['Gate'], ['parsing']);
// The following line will be logged
// Format: Gate | It took the gate 12 ms to parse the response | Tag: parsing
DebuggerJS.log('Gate', ['It took the gate', miliseconds, 'ms to parse the response'], 'parsing');
// The following line will not be logged since the tag doesn't match our filtering.
DebuggerJS.log('Gate', ['It took the gate', miliseconds, 'ms to serialize the response'], 'serializing');
```

##Testing

1. In order to run the tests you need to have **NodeJS** installed. The first time
run **./install.sh** to install all the depedencies needed to run the tests.

2. When you have installed your depedencies then execute **./run.sh** to run the
tests.

**Both install.sh and run.sh scripts are working in Linux and MacOSX for now**

##License

Copyright (c) 2012, Theodoros Tsiridis  
All rights reserved.  

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:  

* Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.  
* Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.  
* Neither the name of the <organization> nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.  
 
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.  