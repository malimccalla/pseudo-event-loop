const crypto = require('crypto');
const https = require('https');
const fs = require('fs');

const start = Date.now();

const doRequest = () =>
  https
    .request('https://www.google.com', res => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log('REQUEST:', Date.now() - start);
      });
    })
    .end();

const doHash = () =>
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('HASH:', Date.now() - start);
  });

doRequest();

// reading from computers file system is usuall super fast ~20ms
fs.readFile('multitask.js', 'utf8', () => {
  console.log('FS:', Date.now() - start);
});

// If we run 3 hashes OUTPUT:

// FS: 23
// REQUEST: 126
// HASH: 1989
// HASH: 1990
// HASH: 2001

doHash();
doHash();
doHash();
doHash();

// 4 HASHES OUTPUT:

// REQUEST: 109
// HASH: 2023
// FS: 2024 - note: exactly 1ms after first hash completes
// HASH: 2035
// HASH: 2039
// HASH: 2051

// This happens as BOTH the FS module and the crypto module make use of the threadpool
// THREAD #1 will start the async call but whilst it is waiting on the result of the HD
// It will decide to run another task (in our case the 5th hash waiting around).
// One of the hashes will then finish freeing up a thread for the FS call to output its results
