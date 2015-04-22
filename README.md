# waitFor

[![Build Status](https://travis-ci.org/Apercu/waitFor.svg?branch=master)](https://travis-ci.org/Apercu/waitFor) [![Coverage Status](https://coveralls.io/repos/Apercu/waitFor/badge.svg?branch=master)](https://coveralls.io/r/Apercu/waitFor?branch=master) [![Dependency Status](https://david-dm.org/Apercu/waitFor.svg)](https://david-dm.org/Apercu/waitFor) [![Code Climate](https://codeclimate.com/github/Apercu/waitFor/badges/gpa.svg)](https://codeclimate.com/github/Apercu/waitFor)

> A simple node module that makes process dependencies easier.

### Install

    npm install --save waitFor

### Usage

    waitFor.wait(function () {
      // ready!
    });

    // Could be in another process
    setTimeout(function () {
      waitFor.ready();
    }, 42);

The `wait` method can be used either with a callback or a promise.

    waitFor.wait(function () {
      // ready!
    });

    waitFor.wait().then(function () {
      // ready!
    });

You can configure the the port used by the websocket server with an optional object.

    waitFor.wait({ port: 420 }, function () {});

When your work is done, you only have to call the `ready` function.

    waitFor.ready();

You can also give it an optional object and a callback or use the promise.

    waitFor.ready({ port: 420 });
