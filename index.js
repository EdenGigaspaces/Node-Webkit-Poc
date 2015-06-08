#!/usr/bin/env node
var log4js = require('log4js');

var spawn = require('child_process').spawn;

log4js.configure({
    appenders: [
        { type: 'file', filename: 'testapp.log' }
    ]
});


var logger = log4js.getLogger('main');

console.log(process.pid);

// after this point, we are a daemon
require('daemon')();

require('./cloudify-ui/server');
require('./server');

var child = spawn('nw', ['.'], {
    stdio: [ 'ignore', 'ignore', 'ignore' ]
});

child.on('exit',function(){logger.info('nw exited!'); process.exit(0);});

// different pid because we are now forked
// original parent has exited
console.log(process.pid);



