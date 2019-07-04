// Clustering using pm2

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

// Standard Command to use with pm2 (used in prod)
// (0 -> let pm2 choose for you how to deal with instances, usually reflects the logical amount of CPU's on your server)
// pm2 start index.pm2.js -i 0
// --> you will get back to the cli, as PM2 by default daemonizes
// Other usefull commands:
// pm2 monitor
// pm2 startup
// pm2 list
// pm2 show <instance name> // shows more detailed info
// pm2 monit // shows little dashboard with logs
// pm2 delete <instance name> // removes and kills the processes



// Logical vs Physical Cores
// Logical -> how many thread per actual core can be handled, total of this
// e.g. 2 threads / core and you have 2 physical cores --> 4 logical cores available
// Physical --> how many actual cores a CPU has
// See multithreading/hyperthreading

