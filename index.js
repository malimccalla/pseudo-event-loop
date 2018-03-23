process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');
const express = require('express');
const crypto = require('crypto');
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

  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hi there');
    });
  });

  app.get('/fast', (req, res) => {
    res.send('Wow, that was fast');
  });

  app.listen(8000);
}
