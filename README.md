# waitFor

[![Build Status](https://travis-ci.org/Apercu/waitFor.svg?branch=develop)](https://travis-ci.org/Apercu/waitFor) [![Dependency Status](https://david-dm.org/Apercu/waitFor.svg)](https://david-dm.org/Apercu/waitFor) [![Code Climate](https://codeclimate.com/github/Apercu/waitFor/badges/gpa.svg)](https://codeclimate.com/github/Apercu/waitFor)

> A simple node module that makes process dependencies easier.

### Usage

    npm install --save waitFor

First, you'll have to wait for something, you can either use a callback or a promise.

    waitFor.wait(function () {
      // ready!
    });

    waitFor.wait().then(function () {
      // ready!
    });

The `wait` method takes an optional object where you can configure the port used by the websocket server.

    waitFor.wait({ port: 420 }, function () {});

When your work is done, you only have to call the `ready` function.

    waitFor.ready();

You can also give it an optional object and a callback or use the promise.

    waitFor.ready({ port: 420 });
