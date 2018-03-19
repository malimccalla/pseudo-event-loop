// The event loop is single threaded yet libuv executes some code outside of the event loops.
// By 'Thread pooling' computationally expensive tasks it allows for node to run multiple threads

// The thread pool allows for 4 threads to be ran simultaneously

// We can manually update the default libuv threadpool size
process.env.UV_THREADPOOL_SIZE = 2;

const crypto = require('crypto');

const start = Date.now();

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('Thread 1:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('Thread 2:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('Thread 3:', Date.now() - start);
});

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('Thread 4:', Date.now() - start);
});

// If kept at the default thread pool size of 4 a delay will occur
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('Thread 5:', Date.now() - start);
});
