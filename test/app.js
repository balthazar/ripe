'use strict';

var fs = require('fs');
var del = require('del');
var assert = require('assert');
var waitFor = require('../');

describe('waitFor', function () {

  it('should create file when calling start without options', function (cb) {

    waitFor.start();
    fs.readFile('.waitFor', function (err, data) {
      if (err) { return cb(err); }
      assert.strictEqual(data.toString(), 'waiting');
      cb();
    });

  });


  it('should create a file in the specified path', function (cb) {

    waitFor.start({ path: __dirname + '/.test' });
    fs.readFile('./test/.test', function (err, data) {
      if (err) { return cb(err); }
      assert.strictEqual(data.toString(), 'waiting');
      cb();
    });

  });

  it('should call the ready method and thus see a file change', function (cb) {

    fs.readFile('.waitFor', function (err, data) {
      if (err) { return cb(err); }
      assert.strictEqual(data.toString(), 'waiting');
      waitFor.ready();

      fs.readFile('.waitFor', function (err, data) {
        if (err) { return cb(err); }
        assert.strictEqual(data.toString(), 'ready');
        cb();
      });

    });

  });

  it('should test the wait flow using a callback', function (cb) {

    var check = false;
    waitFor.start();

    waitFor.wait(function () {
      assert.strictEqual(check, true);
      fs.readFile('.waitFor', function (err) {
        assert.equal(!!err, true);
        assert.strictEqual(err.code, 'ENOENT');
        cb();
      });
    });

    setTimeout(function () {
      check = true;
      waitFor.ready();
    }, 242);

  });

  it('should test the wait flow using a promise and no parameters', function (cb) {

    var check = false;
    waitFor.start();

    waitFor.wait().then(function () {
      assert.strictEqual(check, true);
      fs.readFile('.waitFor', function (err) {
        assert.equal(!!err, true);
        assert.strictEqual(err.code, 'ENOENT');
        cb();
      });
    });

    setTimeout(function () {
      check = true;
      waitFor.ready();
    }, 242);

  });

  it('should test the wait flow using some random options and a callback', function (cb) {

    var check = false;
    waitFor.start();

    waitFor.wait({ timeout: (Math.floor(Math.random() * 100) + 1) }, function () {
      assert.strictEqual(check, true);
      fs.readFile('.waitFor', function (err) {
        assert.equal(!!err, true);
        assert.strictEqual(err.code, 'ENOENT');
        cb();
      });
    });

    setTimeout(function () {
      check = true;
      waitFor.ready();
    }, 242);

  });

  it('should test the wait flow using some random options and a promise', function (cb) {

    var check = false;
    waitFor.start();

    waitFor.wait({ timeout: (Math.floor(Math.random() * 100) + 1) }).then(function () {
      assert.strictEqual(check, true);
      fs.readFile('.waitFor', function (err) {
        assert.equal(!!err, true);
        assert.strictEqual(err.code, 'ENOENT');
        cb();
      });
    });

    setTimeout(function () {
      check = true;
      waitFor.ready();
    }, 242);

  });

  after(function (cb) {
    del([
      '.waitFor',
      './test/.test'
    ], cb);
  });

});
