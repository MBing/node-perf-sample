// process.env.UV_THREADPOOL_SIZE = 1; // for testing purposes
// clustering example (self made clustering)
const cluster = require('cluster');

// console.log(cluster.isMaster); // first time run --> `isMaster === True`, after that instance, worker instances are booted up

// Is the file being executed in master mode?
if (cluster.isMaster) {
    //  Causes index.js to be executed again, but in child/slave/instance of master mode

    cluster.fork(); // starts up another instance, the more instances/forks you have, the faster you can let the other routes load ..
    // every child has its own Threadpool (4 threads)
} else {
    // I'm a child/slave/instance, I'm going to act like a server and do nothing else
    const express = require('express');
    const app = express();
    const crypto = require('crypto');

    // Example 1
    // const doWork = (duration) => {
    //     const start = Date.now();
    //
    //     while(Date.now() - start < duration) {}
    // };

    // Example 1
    // app.get('/', (req, res) => {
    //     doWork(5000); // example of blocking the event loop
    //     res.send('Hi there')
    // });

    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('Hi there')
        });
    });

    app.get('/fast', (req, res) => {
        res.send('This was fast');
    });

    app.listen(3000);
}

// using apache benchmark command to monitor our server performance
// make sure your server is running before testing
// ab -c 50 -n 500 localhost:3000/fast

// with clustering you need to watch out, too many might make your cores busy
// so best to add up your number of children to your number of available cores (server cores), for optimal use

