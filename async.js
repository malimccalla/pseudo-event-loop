// Just as the node standard library has functions that make use of the thread pool,
// it also has code that makes use of the underlying operating system though libuv

// these won't be blocked as all work is delegated to our OS that makes the request

const https = require('https');

const start = Date.now();

const doRequest = () =>
  https
    .request('https://www.google.com', res => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log(Date.now() - start);
      });
    })
    .end();

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
