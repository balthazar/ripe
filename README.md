# WaitFor

> A simple node module to see when work is done in other processes, without having to rely on some timeouts.

### Usage

    npm install --save waitFor

First, you'll have to call the `start` with a path parameter

    waitFor.start({ path: '.bangular-refresh' });

Do your job, and when it's done, call `ready`:

    waitFor.ready({ path: '.bangular-refresh' });

The `wait` will return a promise if no callback is provided

    waitFor.wait({ path: '.bangular-refresh' }, function () {
      // here
    });

    waitFor.wait({ path: '.bangular-refresh' }).then(function () {
      // here
    });
