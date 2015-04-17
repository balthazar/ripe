'use strict';

var fs = require('fs');

function writeToFile (path, str) {

  var stream = fs.createWriteStream(path);
  stream.end(str);

};

var waitFor = {

  start: function (options) {

    if (!options || !options.path) { console.log('Error.'); }
    writeToFile(options.path, 'waiting');

  },

  ready: function (options) {

    if (!options || !options.path) { console.log('Error.'); }
    writeToFile(options.path, 'ready');

  },

  wait: function (options, cb) {

    var id;
    var def = !cb ? require('q').defer() : null;

    id = setInterval(function () {

      fs.readFile(options.path, 'utf-8', function (err, data) {

        if (err) {
          if (err.code === 'ENOENT') {
            clearTimeout(id);
            return waitFor.start(options);
          }

          clearTimeout(id);
          if (def) { def.reject(err); }
          else { cb(err); }
        }

        if (data === 'ready') {

          fs.unlink(options.path, function () {
            clearTimeout(id);

            if (def) {
              def.resolve();
            } else {
              cb();
            }

          });

        }

      });

    }, options.timeout || 100);

    if (def) {
      return def.promise;
    }

  }

};

module.exports = waitFor;
