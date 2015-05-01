'use strict';

var q = require('q');

var noop = function () {};

var ripe = {

  /**
   * When the task is ready, call this function to update the content of the file.
   *
   * @param {Object} options
   * @param {Function|} cb
   * @returns {*|promise}
   */
  ready: function (options, cb) {

    if (arguments.length === 1 && typeof options === 'function') {
      cb = options;
      options = {};
    }

    options = options || {};
    cb = cb || noop;

    var def = q.defer();

    var WebSocket = require('ws');
    var ws = new WebSocket('ws://localhost:' + (options.port ? options.port : 1337));

    ws.on('open', function () {
      ws.send('ready', function (err) {
        /* istanbul ignore if */
        if (err) {
          def.reject(err);
        } else {
          def.resolve(err);
        }
        cb(err);
      });
    });

    ws.on('error', function (err) {
      def.reject(err);
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
      options = {};
    }

    options = options || {};
    cb = cb || noop;

    var WebSocketServer = require('ws').Server,
        wss = new WebSocketServer({ port: options.port ? options.port : 1337 });

    var def = q.defer();

    wss.on('connection', function (ws) {
      ws.on('message', function () {
        wss.close();
        def.resolve();
        cb();
      });
    });

    wss.on('error', noop);

    return def.promise;

  }

};

module.exports = ripe;
