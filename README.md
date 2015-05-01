# ripe

[![Build Status](https://travis-ci.org/Apercu/ripe.svg?branch=master)](https://travis-ci.org/Apercu/ripe) [![Coverage Status](https://coveralls.io/repos/Apercu/ripe/badge.svg?branch=master)](https://coveralls.io/r/Apercu/ripe?branch=master) [![Dependency Status](https://david-dm.org/Apercu/ripe.svg)](https://david-dm.org/Apercu/ripe) [![Code Climate](https://codeclimate.com/github/Apercu/ripe/badges/gpa.svg)](https://codeclimate.com/github/Apercu/ripe)

> A simple node module that makes process dependencies easier.

### Install

    npm install --save ripe

### Usage

    ripe.wait(function () {
      // ready!
    });

    // Could be in another process
    setTimeout(function () {
      ripe.ready();
    }, 42);

The `wait` method can be used either with a callback or a promise (or both, if you're brave enough).

    ripe.wait(function () {
      // ready!
    });

    ripe.wait().then(function () {
      // ready!
    });

You can configure the the port used by the websocket server with an optional object.

    ripe.wait({ port: 420 }, function () {});

When your work is done, you only have to call the `ready` function.

    ripe.ready();

You can also give it an optional object and a callback or use the promise.

    ripe.ready({ port: 420 });
