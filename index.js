'use strict';

var fs = require('fs');

function writeToFile (path, str) {

  fs.writeFile(path || '.waitFor', str);

}

var waitFor = {

  /**
   * Start the process, create a file to wait for.
   *
   * @param {Object} options
   */
  start: function (options) {

    options = options || {};

    writeToFile(options.path, 'waiting');

  },

  /**
   * When the task is ready, call this function to update the content of the file.
   *
   * @param {Object} options
   */
  ready: function (options) {

    options = options || {};

    writeToFile(options.path, 'ready');

  },

  /**
   * Wait for the file to contain the content specified by the ready task.
   *
   * @param {Object|} options
   * @param {Function} cb
   * @returns {*|promise}
   */
  wait: function (options, cb) {

    if (arguments.length === 1 && typeof options === 'function') {
      cb = options;
    }

    options = options || {};
    cb = cb || function () {};

    var def = require('q').defer();

    var id = setInterval(function () {

      fs.readFile(options.path || '.waitFor', 'utf-8', function (err, data) {

        if (err) {
          if (err.code === 'ENOENT') {
            clearTimeout(id);
            return waitFor.start(options);
          }

          clearTimeout(id);
          def.reject(err);
          cb(err);
        }

        if (data === 'ready') {

          fs.unlink(options.path || '.waitFor', function () {
            clearTimeout(id);
            def.resolve();
            cb();
          });

        }

      });

    }, options.interval || 100);

    return def.promise;

  }

};

module.exports = waitFor;
