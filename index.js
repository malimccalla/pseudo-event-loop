const cluster = require('cluster');
const express = require('express');
const app = express();

if (cluster.isMaster) {
  // first time index.js is ran we will be in master mode
  // running 'fork()' will generate a child or 'worker' instance
  cluster.fork();
  cluster.fork();
  cluster.fork();
  cluster.fork();
} else {
  // Here the code will be executed in worker mode
  function doWork(duration) {
    const start = Date.now();
    while (Date.now() - start < duration) {}
  }

  app.get('/', (req, res) => {
    doWork(5000);
    res.send('Hi there');
  });

  app.get('/fast', (req, res) => {
    res.send('Wow, that was fast');
  });

  app.listen(8000);
}
