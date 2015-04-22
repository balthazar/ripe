'use strict';

var q = require('q');
var fs = require('fs');

var noop = function () {};

var waitFor = {

  /**
   * Start the process, create a file to wait for.
   *
   * @param {Object} options
   * @param {Function} cb
   * @returns {*|promise}
   */
  start: function (options, cb) {

    var def = q.defer();
    options = options || {};
    cb = cb || noop;

    fs.writeFile(options.path || '.waitFor', 'waiting', function (err) {
      if (err) { def.reject(err); }
      else { def.resolve(); }
      cb(err);
    });

    return def.promise;

  },

  /**
   * When the task is ready, call this function to update the content of the file.
   *
   * @param {Object} options
   * @param {Function|} cb
   * @returns {*|promise}
   */
  ready: function (options, cb) {

    var def = q.defer();
    options = options || {};
    cb = cb || noop;

    fs.writeFile(options.path || '.waitFor', 'ready', function (err) {
      if (err) { def.reject(err); }
      else { def.resolve(); }
      cb(err);
    });

    return def.promise;

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
    cb = cb || noop;

    var def = q.defer();

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
