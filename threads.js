// The event loop is single threaded yet libuv executes some code outside of the event loops.
// By 'Thread pooling' computationally expensive tasks it allows for node to run multiple threads

// The thread pool allows for 4 threads to be ran simultaneously

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

// Delay will occur
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('Thread 5:', Date.now() - start);
});
