# WaitFor

[![Build Status](https://travis-ci.org/Apercu/waitFor.svg?branch=develop)](https://travis-ci.org/Apercu/waitFor) [![Dependency Status](https://david-dm.org/Apercu/waitFor.svg)](https://david-dm.org/Apercu/waitFor) [![Code Climate](https://codeclimate.com/github/Apercu/waitFor/badges/gpa.svg)](https://codeclimate.com/github/Apercu/waitFor)

> A simple node module to see when work is done in other processes, without having to rely on some timeouts.

### Usage

    npm install --save waitFor

First, you'll have to call the `start`

    waitFor.start();

Do your job, and when it's done, call `ready`:

    waitFor.ready();

`start` and `ready` can tape an optional object with the `path` option.

    waitFor.start({ path: '/home/cron-launcher' });

The `wait` takes an option object and a callback, it also return a promise,
here the interval is used to determine the time between file reload.

    waitFor.wait({ path: '../.refresh', interval: 50 }, function () {

    });

If you pass only one argument, we will check if it's either an object or a function.

    waitFor.wait(function () {

    });

You can also call it without parameter and use it like:

    waitFor.wait().then(function () {

    });
